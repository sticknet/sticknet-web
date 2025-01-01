import {fromByteArray, toByteArray} from 'base64-js';
import argon2 from 'argon2-browser';
import heic2any from 'heic2any';
import {download} from '../actions/actionTypes';
import secureStorage from './secureStorage';
import {pbDecrypt, pbEncrypt} from './pbEncryption';

export function fileToArrayBuffer(file: Blob): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve((event.target as FileReader).result as ArrayBuffer);
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}

export async function urlToArrayBuffer(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
}

export async function urlToArrayBufferWithProgress(
    url: string,
    uriKey: string | null,
    dispatch: any,
): Promise<ArrayBuffer> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const totalLength = +response.headers.get('content-length')!;
    if (!totalLength) {
        throw new Error('Content-Length header missing');
    }
    let bytesReceived = 0;
    const chunks: Uint8Array[] = [];
    const reader = response.body!.getReader();
    while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        chunks.push(value);
        bytesReceived += value.length;
        const progress = bytesReceived / totalLength;
        if (uriKey) dispatch({type: download.DOWNLOADING, payload: {uriKey, progress}});
    }
    const combinedChunks = new Uint8Array(bytesReceived);
    chunks.reduce((position, chunk) => {
        combinedChunks.set(chunk, position);
        return position + chunk.length;
    }, 0);
    return combinedChunks.buffer;
}

async function encryptBlob(file: Blob): Promise<{blob: Blob; secret: string} | null> {
    try {
        const fileData = await fileToArrayBuffer(file);

        const encryptionKey = window.crypto.getRandomValues(new Uint8Array(32));
        const hmacKey = window.crypto.getRandomValues(new Uint8Array(32));

        const iv = window.crypto.getRandomValues(new Uint8Array(16));

        const algo = {
            name: 'AES-CBC',
            iv,
        };

        const cryptoKey = await window.crypto.subtle.importKey('raw', encryptionKey, algo, false, ['encrypt']);

        const encryptedData = await window.crypto.subtle.encrypt(algo, cryptoKey, fileData);

        const dataToSign = new Uint8Array([...iv, ...new Uint8Array(encryptedData)]);
        const hmac = await window.crypto.subtle.sign(
            'HMAC',
            await window.crypto.subtle.importKey(
                'raw',
                hmacKey,
                {
                    name: 'HMAC',
                    hash: 'SHA-256',
                },
                false,
                ['sign'],
            ),
            dataToSign,
        );

        const combinedBlob = new Uint8Array([...iv, ...new Uint8Array(encryptedData), ...new Uint8Array(hmac)]);

        const blob = new Blob([combinedBlob], {type: 'application/octet-stream'});

        const digest = await window.crypto.subtle.digest('SHA-256', combinedBlob);
        const digestArray = new Uint8Array(digest);

        const secret = fromByteArray(new Uint8Array([...encryptionKey, ...hmacKey])) + fromByteArray(digestArray);

        const map = {
            blob,
            secret,
        };

        return map;
    } catch (error) {
        console.log('ERROR IN ENCRYPT BLOB: ', error);
    }
    return null;
}

async function decryptBlob(
    fileUrl: string,
    secret: string,
    uriKey: string | null,
    fileType: string,
    dispatch: any,
    isPreview: boolean | undefined,
): Promise<{uri: string; heicUri?: string} | null> {
    try {
        let fileData;
        if (isPreview) fileData = await urlToArrayBuffer(fileUrl);
        else fileData = await urlToArrayBufferWithProgress(fileUrl, uriKey, dispatch);
        const keyData = toByteArray(secret.substring(0, 88));

        const digest = secret.substring(88);

        const calculatedDigest = await window.crypto.subtle.digest('SHA-256', fileData);
        const calculatedDigestArray = fromByteArray(new Uint8Array(calculatedDigest));
        if (digest !== calculatedDigestArray) {
            throw new Error('Validation failed: Digest does not match');
        }

        const encryptionKey = keyData.slice(0, 32);
        const hmacKey = keyData.slice(32);

        const iv = new Uint8Array(fileData.slice(0, 16));

        const hmac = new Uint8Array(fileData, fileData.byteLength - 32, 32);

        const cipherText = new Uint8Array(fileData.slice(16, fileData.byteLength - 32));

        const dataToAuth = fileData.slice(0, fileData.byteLength - 32);

        const hmacImportedKey = await window.crypto.subtle.importKey(
            'raw',
            hmacKey,
            {
                name: 'HMAC',
                hash: 'SHA-256',
            },
            false,
            ['verify'],
        );

        const isValidHmac = await window.crypto.subtle.verify(
            'HMAC',
            hmacImportedKey,
            hmac,
            new Uint8Array(dataToAuth),
        );
        if (!isValidHmac) {
            throw new Error('Validation failed: HMAC does not match');
        }

        const keys = await window.crypto.subtle.importKey(
            'raw',
            encryptionKey,
            {
                name: 'AES-CBC',
                length: 256,
            },
            false,
            ['decrypt'],
        );

        const decrypted = await window.crypto.subtle.decrypt({name: 'AES-CBC', iv: iv.buffer}, keys, cipherText.buffer);

        const blob = new Blob([decrypted], {type: fileType});

        let heicUri;
        if (fileType.toLowerCase().includes('heic') && !isPreview) {
            dispatch({type: download.HEIC_PROCESSING, payload: {uriKey}});
            const heicBlob = await heic2any({blob});
            heicUri = URL.createObjectURL(heicBlob as Blob);
            dispatch({type: download.HEIC_PROCESSING_DONE, payload: {uriKey}});
        }

        const uri = URL.createObjectURL(blob);

        return {uri, heicUri};
    } catch (error) {
        console.log('ERROR IN DECRYPT BLOB: ', error);
        return null;
    }
}

async function encryptFileVault(file: Blob): Promise<{blob: Blob; cipher: string} | null> {
    const response = await encryptBlob(file);
    const password = await secureStorage.getItem('#Password');
    if (response && password) {
        const encrypted = await pbEncrypt(response.secret, password);
        return {blob: response.blob, cipher: encrypted.cipher + encrypted.salt};
    }
    return null;
}

async function decryptFileVault(
    filePath: string,
    cipher: string,
    uriKey: string | null,
    fileType: string,
    dispatch: any,
    isPreview: boolean | undefined,
): Promise<{uri: string; heicUri?: string} | null> {
    const encryptedSecret = cipher.substring(0, cipher.length - 44);
    const salt = cipher.substring(cipher.length - 44);
    const password = await secureStorage.getItem('#Password');
    if (password) {
        const secret = await pbDecrypt(encryptedSecret, salt, password);
        if (secret) {
            return decryptBlob(filePath, secret, uriKey, fileType, dispatch, isPreview);
        }
    }
    return null;
}

async function encryptTextVault(text: string): Promise<string | null> {
    const password = await secureStorage.getItem('#Password');
    if (password) {
        const encrypted = await pbEncrypt(text, password);
        return encrypted.cipher + encrypted.salt;
    }
    return null;
}

async function decryptTextVault(cipher: string): Promise<string | null> {
    const encryptedText = cipher.substring(0, cipher.length - 44);
    const salt = cipher.substring(cipher.length - 44);
    const password = await secureStorage.getItem('#Password');
    if (password) {
        return pbDecrypt(encryptedText, salt, password);
    }
    return null;
}

async function createPasswordHash(password: string, passwordSalt: string) {
    const response = await argon2.hash({
        pass: password,
        salt: toByteArray(passwordSalt),
        type: argon2.ArgonType.Argon2id,
        mem: 4 * 1024,
        parallelism: 2,
        time: 3,
        hashLen: 32,
    });
    return fromByteArray(response.hash);
}

export {
    encryptBlob,
    decryptBlob,
    encryptFileVault,
    decryptFileVault,
    encryptTextVault,
    decryptTextVault,
    createPasswordHash,
};

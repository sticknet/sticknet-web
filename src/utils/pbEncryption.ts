import argon2 from 'argon2-browser';
import {fromByteArray, toByteArray} from 'base64-js';

export async function pbEncrypt(text: string, password: string): Promise<{cipher: string; salt: string}> {
    const salt = window.crypto.getRandomValues(new Uint8Array(32));
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const argon2Response = await argon2.hash({
        pass: password,
        salt,
        type: argon2.ArgonType.Argon2id,
        mem: 4 * 1024,
        parallelism: 2,
        time: 3,
        hashLen: 32,
    });

    const hash = argon2Response.hash;

    const algo = {
        name: 'AES-CBC',
        iv,
    };

    const cryptoKey = await window.crypto.subtle.importKey('raw', hash, algo, false, ['encrypt']);

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const encryptedData = await window.crypto.subtle.encrypt(algo, cryptoKey, data);

    const cipher = new Uint8Array([...iv, ...new Uint8Array(encryptedData)]);
    return {cipher: fromByteArray(cipher), salt: fromByteArray(salt)};
}

export async function pbDecrypt(cipher: string, salt: string, password: string): Promise<string | null> {
    try {
        const data = toByteArray(cipher);
        const iv = new Uint8Array(data.slice(0, 16));
        const cipherText = new Uint8Array(data.slice(16, data.length));
        const argon2Response = await argon2.hash({
            pass: password,
            salt: toByteArray(salt),
            type: argon2.ArgonType.Argon2id,
            mem: 4 * 1024,
            parallelism: 2,
            time: 3,
            hashLen: 32,
        });

        const hash = argon2Response.hash;

        const algo = {
            name: 'AES-CBC',
            iv,
        };

        const cryptoKey = await window.crypto.subtle.importKey('raw', hash, algo, false, ['decrypt']);

        const decrypted = await window.crypto.subtle.decrypt(algo, cryptoKey, cipherText);

        const decoder = new TextDecoder('utf-8');
        const string = decoder.decode(decrypted);

        return string;
    } catch (error) {
        console.log('ERROR IN pbDecrypt: ', error);
    }
    return null;
}

import {pbDecrypt, pbEncrypt} from './cryptography';
import {globalData} from '../actions/globalVariables';

const secureStorage = (() => {
    return {
        async setItem(key: string, value: string) {
            const encrypted = await pbEncrypt(value, globalData.webKey);
            const ciphertext = encrypted.cipher + encrypted.salt;
            localStorage.setItem(key, ciphertext);
        },

        async getItem(key: string) {
            const cipher = localStorage.getItem(key);
            if (!cipher) return null;
            const encryptedSecret = cipher.substring(0, cipher.length - 44);
            const salt = cipher.substring(cipher.length - 44);
            return pbDecrypt(encryptedSecret, salt, globalData.webKey);
        },
    };
})();

export default secureStorage;

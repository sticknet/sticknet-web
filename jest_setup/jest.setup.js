global.URL.createObjectURL = jest.fn();

global.FileReader = jest.fn().mockImplementation(() => ({
    readAsArrayBuffer: jest.fn(),
    onloadend: jest.fn(),
    result: new ArrayBuffer(8),
}));

global.crypto = {
    getRandomValues: (arr) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = Math.floor(Math.random() * 256);
        }
        return arr;
    },
    subtle: {
        importKey: jest.fn().mockResolvedValue({}),
        encrypt: jest.fn().mockResolvedValue(new ArrayBuffer(16)),
        decrypt: jest.fn().mockResolvedValue(new ArrayBuffer(16)),
        sign: jest.fn().mockResolvedValue(new Uint8Array(32)),
        digest: jest.fn().mockResolvedValue(new ArrayBuffer(32)),
        verify: jest.fn().mockResolvedValue(true),
        deriveBits: jest.fn(),
        deriveKey: jest.fn(),
        exportKey: jest.fn(),
        generateKey: jest.fn(),
        unwrapKey: jest.fn(),
        wrapKey: jest.fn(),
    },
};

jest.mock('base64-js', () => ({
    toByteArray: jest.fn().mockReturnValue(new Uint8Array([1, 2, 3, 4])),
    fromByteArray: jest.fn().mockReturnValue('base64string'),
}));

jest.mock('argon2-browser', () => ({
    hash: jest.fn().mockResolvedValue({
        hash: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
    }),
    ArgonType: {
        Argon2id: 2,
    },
}));

jest.mock('uuid', () => ({
    v4: jest.fn().mockReturnValue('mocked-uuid'),
}));

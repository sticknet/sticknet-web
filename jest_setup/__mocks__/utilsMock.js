export const fileToArrayBuffer = jest.fn((file) => Promise.resolve(new ArrayBuffer(8)));

export const urlToArrayBuffer = jest.fn((url) => Promise.resolve(new ArrayBuffer(8)));

export const urlToArrayBufferWithProgress = jest.fn((url, uriKey, dispatch) => Promise.resolve(new ArrayBuffer(8)));

export const pbEncrypt = jest.fn((text, password) => Promise.resolve({cipher: 'cipher', salt: 'salt'}));

export const pbDecrypt = jest.fn((cipher, salt, password) => Promise.resolve('decryptedText'));

export const encryptBlob = jest.fn((file) => Promise.resolve({blob: new Blob(), secret: 'secret'}));

export const decryptBlob = jest.fn((fileUrl, secret, uriKey, fileType, dispatch, isPreview) =>
    Promise.resolve({
        uri: 'uri',
        heicUri: 'heicUri',
    }),
);

export const encryptFileVault = jest.fn((file) => Promise.resolve({blob: new Blob(), cipher: 'cipher'}));

export const decryptFileVault = jest.fn((filePath, cipher, uriKey, fileType, dispatch, isPreview) =>
    Promise.resolve({
        uri: 'uri',
        heicUri: 'heicUri',
    }),
);

export const encryptTextVault = jest.fn((text) => Promise.resolve('encryptedText'));

export const decryptTextVault = jest.fn((cipher) => Promise.resolve('decryptedText'));
export const parseNumber = jest.fn().mockReturnValue('+1 234 567 890');
export const getOSAndBrowser = jest.fn().mockReturnValue('Windows - Google Chrome');
export const createPreview = jest.fn(() => Promise.resolve({size: 100, type: 'image/jpeg'}));
export const createThumbnail = jest.fn(() => Promise.resolve({size: 100, type: 'image/jpeg'}));
export const createPasswordHash = jest.fn((text) => Promise.resolve('encryptedText'));

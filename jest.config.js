module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
        '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/jest_setup/__mocks__/FileMock.js',
        heic2any: '<rootDir>/jest_setup/__mocks__/heic2anyMock.js',
        '^../../utils$': '<rootDir>/jest_setup/__mocks__/utilsMock.js',
    },
    setupFilesAfterEnv: ['./jest_setup/jest.setup.js'],
    transformIgnorePatterns: ['node_modules/(?!@babel/runtime/helpers/esm/)'],
    rootDir: './',
};

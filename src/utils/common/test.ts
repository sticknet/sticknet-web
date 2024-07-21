import {
    parseNumber,
    formatTime,
    formatAMPM,
    formatDate,
    getOSAndBrowser,
    createFileSections,
    isCloseToBottom,
    handleHistoryFilePath,
    getInitials,
    unixToDate,
    formatBytes,
    validateEmail,
    handleLinks,
} from '..';
import {createFilesList} from './index';

describe('Utils functions', () => {
    test('parseNumber()', () => {
        expect(parseNumber('+1', '+1551230956')).toBe('+1 55 123 0956');
    });

    test('formatTime()', () => {
        expect(formatTime(65)).toBe('1:05');
        expect(formatTime(130)).toBe('2:10');
        expect(formatTime(59)).toBe('0:59');
        expect(formatTime(3600)).toBe('60:00');
    });

    test('formatAMPM()', () => {
        expect(formatAMPM('2022-12-31T23:59:59')).toBe('11:59 PM');
        expect(formatAMPM('2022-12-31T00:00:00')).toBe('12:00 AM');
        expect(formatAMPM(new Date(2022, 11, 31, 15, 30, 0))).toBe('3:30 PM');
        expect(formatAMPM(new Date(2022, 11, 31, 7, 5, 0))).toBe('7:05 AM');
    });

    test('formatDate()', () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        expect(formatDate(today)).toBe('Today');
        expect(formatDate(yesterday)).toBe('Yesterday');
        expect(formatDate('2022-01-01')).toBe('1/1/22');
    });

    test('getOSAndBrowser()', () => {
        const userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get');
        const platformGetter = jest.spyOn(window.navigator, 'platform', 'get');

        userAgentGetter.mockReturnValue(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        );
        platformGetter.mockReturnValue('Win32');
        expect(getOSAndBrowser()).toBe('Windows - Google Chrome');

        userAgentGetter.mockReturnValue(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
        );
        platformGetter.mockReturnValue('MacIntel');
        expect(getOSAndBrowser()).toBe('MacOS - Apple Safari');
    });

    test('createFileSections()', () => {
        const filesTree = {file1: 'key1', file2: 'key2'};
        const mostRecent = ['key1'];
        const files = {key1: {name: 'file1', isFolder: false}, key2: {name: 'file2', isFolder: true}};

        const sections = createFileSections(filesTree, mostRecent, files);
        expect(sections).toEqual([
            {title: 'Recent', data: [{name: 'file1', isFolder: false, fileIndex: 0}]},
            {title: 'Folders', data: [{name: 'file2', isFolder: true}]},
            {title: 'F', data: [{name: 'file1', isFolder: false, fileIndex: 1}]},
        ]);
    });

    test('createFilesList()', () => {
        const filesTree = ['key2', 'key3'];
        const mostRecent = ['key1'];
        const files = {
            key1: {name: 'file1', isFolder: false, timestamp: '2022-12-31T23:59:59'},
            key2: {name: 'file2', isFolder: true},
            key3: {name: 'file3', isFolder: false, timestamp: '2022-12-30T23:59:59'},
        };

        const expectedFileList = [
            {name: 'file1', isFolder: false, timestamp: '2022-12-31T23:59:59'},
            {name: 'file3', isFolder: false, timestamp: '2022-12-30T23:59:59'},
        ];

        const fileList = createFilesList(filesTree, mostRecent, files);
        expect(fileList).toEqual(expectedFileList);
    });

    test('isCloseToBottom()', () => {
        const originalScrollY = window.scrollY;
        const originalInnerHeight = window.innerHeight;
        const originalOffsetHeight = document.body.offsetHeight;

        Object.defineProperty(window, 'scrollY', {value: 1000, configurable: true});
        Object.defineProperty(window, 'innerHeight', {value: 800, configurable: true});
        Object.defineProperty(document.body, 'offsetHeight', {value: 1900, configurable: true});

        expect(isCloseToBottom(100)).toBe(true);

        // Set the offsetHeight to 2400 for the second test case
        Object.defineProperty(document.body, 'offsetHeight', {value: 2400, configurable: true});
        expect(isCloseToBottom(500)).toBe(false);

        // Restore original values
        Object.defineProperty(window, 'scrollY', {value: originalScrollY, configurable: true});
        Object.defineProperty(window, 'innerHeight', {value: originalInnerHeight, configurable: true});
        Object.defineProperty(document.body, 'offsetHeight', {value: originalOffsetHeight, configurable: true});
    });

    test('handleHistoryFilePath()', () => {
        const pushState = jest.spyOn(window.history, 'pushState').mockImplementation(jest.fn());
        const folderStack = [{name: 'root'}, {name: 'folder1'}, {name: 'folder2'}];

        handleHistoryFilePath(folderStack, -1);
        expect(pushState).toHaveBeenCalledWith({}, '', '/vault/files/folder1/');

        pushState.mockRestore();
    });

    test('getInitials()', () => {
        expect(getInitials('John Doe')).toBe('JD');
        expect(getInitials('Jane')).toBe('J');
        expect(getInitials('')).toBe('');
        expect(getInitials('John William Doe')).toBe('JW');
    });

    test('unixToDate()', () => {
        expect(unixToDate('1638316800000')).toBe('01 December 2021');
    });

    test('formatBytes()', () => {
        expect(formatBytes(1024)).toBe('1 KB');
        expect(formatBytes(1048576)).toBe('1 MB');
        expect(formatBytes(1073741824)).toBe('1 GB');
    });

    test('validateEmail()', () => {
        expect(validateEmail('test@example.com')).toBe(true);
        expect(validateEmail('invalid-email')).toBe(false);
        expect(validateEmail('test@.com')).toBe(false);
    });

    test('handleLinks()', () => {
        document.body.innerHTML = '<div id="content">Visit https://example.com for more info.</div>';
        handleLinks('content');
        expect(document.getElementById('content')!.innerHTML).toBe(
            'Visit <a style="color:#0F0F28" href="https://example.com" target="_blank">https://example.com</a> for more info.',
        );
    });
});

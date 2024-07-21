import {waitFor} from '@testing-library/react';
import configureStore from '../../store';
import axiosMock from '../test_data/axiosMock';
import {vault} from '..';
import {API} from '../URL';
import {TVaultNote} from '../../types';

describe('vault.js actions', () => {
    let store: ReturnType<typeof configureStore>['store'];
    const mockDispatch = jest.fn();

    beforeAll(() => {
        axiosMock();
    });

    beforeEach(() => {
        const config = configureStore({});
        store = config.store;
    });

    test('uploadFiles()', async () => {
        const assets = [
            new File([''], 'file1.jpg', {type: 'image/jpeg'}),
            new File([''], 'file2.png', {type: 'image/jpeg'}),
        ];
        const func = vault.uploadFiles(assets, false, null, false);

        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('fetchFiles()', async () => {
        const func = vault.fetchFiles({
            currentUrl: null,
            folderId: 'folderId',
            firstFetch: true,
            refresh: false,
            callback: jest.fn(),
        });
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('fetchLatestFiles()', async () => {
        const func = vault.fetchLatestFiles(jest.fn());
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('fetchPhotos()', async () => {
        const func = vault.fetchPhotos(null, 'albumId', true, true, jest.fn());
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('fetchVaultAlbums()', async () => {
        const func = vault.fetchVaultAlbums(true, jest.fn());
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('fetchVaultNotes()', async () => {
        const func = vault.fetchVaultNotes(`${API}/api/fetch-vault-notes/`, true, jest.fn());
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('createFolder()', async () => {
        const func = vault.createFolder('parentFolderId', 'name', jest.fn());
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('openFolder()', () => {
        const func = vault.openFolder({name: 'folder', id: 'folderId'});
        func(mockDispatch);
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('closeFolder()', () => {
        const func = vault.closeFolder();
        func(mockDispatch);
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('setFolder()', () => {
        const func = vault.setFolder('folderId');
        func(mockDispatch);
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('hideUploadMenu()', () => {
        const func = vault.hideUploadMenu();
        func(mockDispatch);
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('showFileView()', () => {
        const func = vault.showFileView({index: 0, type: 'files'});
        func(mockDispatch);
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('fileViewScroll()', () => {
        const func = vault.fileViewScroll('ArrowRight');
        func(mockDispatch);
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('hideFileView()', () => {
        const func = vault.hideFileView();
        func(mockDispatch);
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('deleteItem()', async () => {
        const func = vault.deleteItem({id: 'fileId', isFolder: false, uriKey: 'uriKey', fileSize: 100}, 'file');
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('renamingFile()', () => {
        const func = vault.renamingFile({id: 'fileId'});
        func(mockDispatch);
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('cancelRenaming()', () => {
        const func = vault.cancelRenaming();
        func(mockDispatch);
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('renameFile()', async () => {
        const func = vault.renameFile({id: 'fileId'}, 'newName');
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('createVaultNote()', async () => {
        const func = vault.createVaultNote('text', jest.fn());
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('updateVaultNote()', async () => {
        const func = vault.updateVaultNote({
            note: {id: 1, timestamp: 'timestamp', text: 'oldText'} as TVaultNote,
            text: 'newText',
        });
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('goToFolder()', async () => {
        const func = vault.goToFolder(['folder1', 'folder2']);
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('searchItems()', async () => {
        const func = vault.searchItems(`${API}/api/search-files/?q=flower&limit=15`, true);
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('movingFile()', () => {
        const func = vault.movingFile({id: 'fileId'});
        func(mockDispatch);
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('cancelMovingFile()', () => {
        const func = vault.cancelMovingFile();
        func(mockDispatch);
        const state = store.getState();
        expect(state).toBeDefined();
    });

    test('moveFile()', async () => {
        const func = vault.moveFile({id: 'fileId', folder: 'sourceFolder'}, {id: 'destinationFolder'});
        await waitFor(() => func(mockDispatch));
        const state = store.getState();
        expect(state).toBeDefined();
    });
});

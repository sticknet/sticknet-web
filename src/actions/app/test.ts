import {waitFor} from '@testing-library/react';
import configureStore from '../../store';
import {app as appActions} from '../index';
import {TFile, TProfilePicture} from '../../types';
import axiosMock from '../test_data/axiosMock';
import state from '../test_data/state.json';

describe('app.js actions functions', () => {
    let store: ReturnType<typeof configureStore>['store'];
    beforeAll(() => {
        axiosMock();
    });
    beforeEach(() => {
        const config = configureStore(state);
        store = config.store;
    });

    test('cacheVaultFile()', async () => {
        const mockFile = {
            uriKey: 'vaultFileA',
            previewUriKey: 'previewVaultFileA',
            presignedUrl: 'https://example.com/vaultFileA',
            previewPresignedUrl: 'https://example.com/previewVaultFileA',
            cipher: 'cipher',
            previewCipher: 'previewCipher',
            type: 'image/jpeg',
        };

        // store initial state
        expect(store.getState().vaultCache.vaultFileA).toBeUndefined();

        const func = appActions.cacheVaultFile({file: mockFile as TFile, isPreview: false});
        await waitFor(() => func(store.dispatch));

        // store updated state
        expect(store.getState().vaultCache.vaultFileA).toBeTruthy();
        expect(store.getState().download.vaultFileA).toBeUndefined();
        expect(store.getState().appTemp.fileTempLoaded.vaultFileA).toBeTruthy();
    });

    test('cacheProfilePicture()', async () => {
        const mockProfilePicture = {
            selfUri: 'https://example.com/profilePicture',
            selfPresignedUrl: 'https://example.com/profilePicture',
            selfCipher: 'cipher',
        };

        // store initial state
        expect(store.getState().app.profilePictureUri).toBeUndefined();

        const func = appActions.cacheProfilePicture(mockProfilePicture as TProfilePicture);
        await waitFor(() => func(store.dispatch));

        // store updated state
        expect(store.getState().app.profilePictureUri).toBeTruthy();
    });

    test('cancelMenus()', async () => {
        const initialCancelMenus = store.getState().appTemp.cancelMenus;

        const func = appActions.cancelMenus();
        await waitFor(() => func(store.dispatch));

        // store updated state
        expect(store.getState().appTemp.cancelMenus).toBe(initialCancelMenus + 1);
    });
});

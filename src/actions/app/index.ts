import {Dispatch} from 'redux';
import {appTemp, cache, download, app} from '../actionTypes';
import {fetchingUri} from '../globalVariables';
import {decryptFileVault} from '../../utils';
import {TFile, TProfilePicture} from '../../types';

type TCacheVaultFileParams = {file: TFile; isPreview?: boolean; callback?: (uri: string) => void};

export function cacheVaultFile({file, isPreview, callback}: TCacheVaultFileParams) {
    return async function (dispatch: Dispatch) {
        const uriKey = isPreview ? file.previewUriKey : file.uriKey;
        dispatch({type: download.DOWNLOADING, payload: {uriKey, progress: 0.001}});
        const cipher = isPreview ? file.previewCipher : file.cipher;
        if (fetchingUri[uriKey]) return;
        fetchingUri[uriKey] = true;
        try {
            const fileUri = isPreview ? file.previewPresignedUrl : file.presignedUrl;
            let uri;
            let heicUri;
            const result = await decryptFileVault(fileUri!, cipher!, uriKey, file.type, dispatch, isPreview);
            if (result) {
                uri = result.uri;
                heicUri = result.heicUri;
            }
            fetchingUri[uriKey] = false;
            if (uri) {
                await dispatch({type: cache.CACHE_FILE_VAULT, payload: {uriKey, uri}});
                if (heicUri)
                    await dispatch({type: cache.CACHE_FILE_VAULT, payload: {uriKey: `${uriKey}-heic`, uri: heicUri}});
                dispatch({type: appTemp.FILE_TEMP_LOADED, payload: uriKey});
            }
            await dispatch({type: download.DOWNLOADED, payload: {uriKey}});
            if (uri) callback?.(uri);
        } catch (err) {
            console.log('ERROR CACHING FILE', err);
        }
    };
}

export function cacheProfilePicture(profilePicture: TProfilePicture) {
    return async function (dispatch: Dispatch) {
        const {selfUri, selfPresignedUrl, selfCipher} = profilePicture;
        const result = await decryptFileVault(selfUri || selfPresignedUrl, selfCipher, null, 'image', dispatch, true);
        dispatch({type: app.PROFILE_PICTURE, payload: result!.uri});
    };
}

export function cancelMenus() {
    return function (dispatch: Dispatch) {
        dispatch({type: appTemp.CANCEL_MENUS});
    };
}

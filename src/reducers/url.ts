import {Action} from 'redux';
import {url} from '../actions/actionTypes';

export interface IUrlState {
    filesUrls: {[key: string]: string};
    photosUrls: {[key: string]: string};
    searchUrl: string | null;
    vaultNotesUrl: string | null;
}

export const initialState: IUrlState = {
    filesUrls: {},
    photosUrls: {},
    searchUrl: null,
    vaultNotesUrl: null,
};

export interface INextFilesUrlAction extends Action {
    payload: {folderId: string; url: string};
}

export interface INextPhotosUrlAction extends Action {
    payload: {albumId: string; url: string};
}

export interface INextSearchUrlAction extends Action {
    payload: string;
}

export interface INextVaultNotesUrlAction extends Action {
    payload: string;
}

type TUrlActions = INextFilesUrlAction | INextPhotosUrlAction | INextSearchUrlAction | INextVaultNotesUrlAction;

export default function (state: IUrlState = initialState, action: TUrlActions): IUrlState {
    switch (action.type) {
        case url.NEXT_FILES_URL:
            const nextFilesUrlPayload = action.payload as INextFilesUrlAction['payload'];
            return {...state, filesUrls: {...state.filesUrls, [nextFilesUrlPayload.folderId]: nextFilesUrlPayload.url}};

        case url.NEXT_PHOTOS_URL:
            const nextPhotosUrlPayload = action.payload as INextPhotosUrlAction['payload'];
            return {
                ...state,
                photosUrls: {...state.photosUrls, [nextPhotosUrlPayload.albumId]: nextPhotosUrlPayload.url},
            };

        case url.NEXT_SEARCH_URL:
            const nextSearchUrlPayload = action.payload as INextSearchUrlAction['payload'];
            return {...state, searchUrl: nextSearchUrlPayload};

        case url.NEXT_VAULT_NOTES_URL:
            const nextVaultNotesUrlPayload = action.payload as INextVaultNotesUrlAction['payload'];
            return {...state, vaultNotesUrl: nextVaultNotesUrlPayload};

        default:
            return state;
    }
}

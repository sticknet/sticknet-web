import {Action} from 'redux';
import {fetched} from '../actions/actionTypes';

export interface IFetchedState {
    folders: {[key: string]: boolean};
    vaultAlbums: {[key: string]: boolean};
}

export const fetchedInitialState: IFetchedState = {
    folders: {},
    vaultAlbums: {},
};

export interface IFetchedFolderAction extends Action {
    payload: string;
}

export interface IFetchedVaultAlbumAction extends Action {
    payload: string;
}

type TFetchedActions = IFetchedFolderAction | IFetchedVaultAlbumAction;

export default function (state: IFetchedState = fetchedInitialState, action: TFetchedActions): IFetchedState {
    switch (action.type) {
        case fetched.FETCHED_FOLDER:
            const fetchedFolderPayload = action.payload as IFetchedFolderAction['payload'];
            return {...state, folders: {...state.folders, [fetchedFolderPayload]: true}};

        case fetched.FETCHED_VAULT_ALBUM:
            const fetchedVaultAlbumPayload = action.payload as IFetchedVaultAlbumAction['payload'];
            return {...state, vaultAlbums: {...state.vaultAlbums, [fetchedVaultAlbumPayload]: true}};

        case fetched.RESET_FETCHED:
            return fetchedInitialState;

        default:
            return state;
    }
}

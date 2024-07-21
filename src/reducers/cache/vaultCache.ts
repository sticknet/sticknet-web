import {Action} from 'redux';
import {cache} from '../../actions/actionTypes';
import type {TCacheFile} from '../../types';

export interface IVaultCacheState {
    [key: string]: TCacheFile;
}

const initialState: IVaultCacheState = {};

export interface ICacheFileVaultAction extends Action {
    payload: {
        uri: string;
        uriKey: string;
    };
}

type CacheActions = ICacheFileVaultAction;

export default function (state: IVaultCacheState = initialState, action: CacheActions): IVaultCacheState {
    switch (action.type) {
        case cache.CACHE_FILE_VAULT:
            const cacheFileVaultPayload = action.payload as ICacheFileVaultAction['payload'];
            return {
                ...state,
                [cacheFileVaultPayload.uriKey]: {uri: cacheFileVaultPayload.uri, uriKey: cacheFileVaultPayload.uriKey},
            };

        default:
            return state;
    }
}

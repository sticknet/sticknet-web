import _ from 'lodash';
import {Action} from 'redux';
import {vault} from '../../actions/actionTypes';
import {TVaultNote} from '../../types';

export interface IVaultNotesState {
    [key: string]: TVaultNote;
}

export interface IFetchVaultNotesAction extends Action {
    payload: {
        firstFetch: boolean;
        notes: TVaultNote[];
    };
}

export interface ICreateNoteAction extends Action {
    payload: TVaultNote;
}

export interface IDeleteNoteAction extends Action {
    payload: string;
}

type IVaultNotesActions = IFetchVaultNotesAction | ICreateNoteAction | IDeleteNoteAction;

export const initialState: IVaultNotesState = {};

export default function (state: IVaultNotesState = initialState, action: IVaultNotesActions): IVaultNotesState {
    switch (action.type) {
        case vault.FETCH_VAULT_NOTES:
            const fetchVaultNotesPayload = action.payload as IFetchVaultNotesAction['payload'];
            if (fetchVaultNotesPayload.firstFetch) {
                return {..._.mapKeys(fetchVaultNotesPayload.notes, 'timestamp')};
            }
            return {...state, ..._.mapKeys(fetchVaultNotesPayload.notes, 'timestamp')};

        case vault.CREATE_NOTE:
            const createNotePayload = action.payload as ICreateNoteAction['payload'];
            return {[createNotePayload.timestamp]: createNotePayload, ...state};

        case vault.DELETE_NOTE:
            const deleteNotePayload = action.payload as IDeleteNoteAction['payload'];
            const newState = {...state};
            delete newState[deleteNotePayload];
            return newState;

        case vault.LOGOUT_NOTES:
            return initialState;

        default:
            return state;
    }
}

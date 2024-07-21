import {Action} from 'redux';
import {upload} from '../actions/actionTypes';

export interface IUploadState {
    showMenu: boolean;
    files: any[];
    count: number | null;
    [key: string]: any;
}

export const initialState: IUploadState = {
    showMenu: false,
    files: [],
    count: null,
};

export interface IDispatchFilesAction extends Action {
    payload: any[];
}

export interface IUploadedAction extends Action {
    payload: {uriKey: string};
}

export interface IUploadingAction extends Action {
    payload: {uriKey: string; progress: number};
}

export interface ICountAction extends Action {
    payload: number;
}

type TUploadActions = IDispatchFilesAction | IUploadedAction | IUploadingAction | ICountAction;

export default function (state: IUploadState = initialState, action: TUploadActions): IUploadState {
    switch (action.type) {
        case upload.SHOW_MENU:
            return {...state, showMenu: true};

        case upload.HIDE_MENU:
            return initialState;

        case upload.DISPATCH_FILES:
            const dispatchFilesPayload = action.payload as IDispatchFilesAction['payload'];
            return {...state, files: [...dispatchFilesPayload, ...state.files]};

        case upload.UPLOADED:
            const uploadedPayload = action.payload as IUploadedAction['payload'];
            return {...state, [uploadedPayload.uriKey]: 1};

        case upload.UPLOADING:
            const uploadingPayload = action.payload as IUploadingAction['payload'];
            return {...state, [uploadingPayload.uriKey]: uploadingPayload.progress};

        case upload.COUNT:
            const countPayload = action.payload as ICountAction['payload'];
            return {...state, count: countPayload};

        case upload.CLEAR:
            return initialState;

        default:
            return state;
    }
}

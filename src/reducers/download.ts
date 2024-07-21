import {Action} from 'redux';
import {download} from '../actions/actionTypes';

export interface IDownloadState {
    [key: string]: number;
}

export interface IDownloadedAction extends Action {
    payload: {uriKey: string};
}

export interface IDownloadingAction extends Action {
    payload: {uriKey: string; progress: number};
}

type TDownloadActions = IDownloadedAction | IDownloadingAction;

export const initialState: IDownloadState = {};

export default function (state: IDownloadState = initialState, action: TDownloadActions): IDownloadState {
    switch (action.type) {
        case download.DOWNLOADED:
            const downloadedPayload = action.payload as IDownloadedAction['payload'];
            const newState = {...state};
            delete newState[downloadedPayload.uriKey];
            return newState;

        case download.DOWNLOADING:
            const downloadingPayload = action.payload as IDownloadingAction['payload'];
            return {...state, [downloadingPayload.uriKey]: downloadingPayload.progress};

        default:
            return state;
    }
}

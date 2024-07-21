import {Action} from 'redux';
import {download} from '../actions/actionTypes';

export interface IHeicProcessingState {
    [uriKey: string]: boolean;
}

export const initialState: IHeicProcessingState = {};

export interface IHeicProcessingAction extends Action {
    payload: {uriKey: string};
}

export interface IHeicProcessingDoneAction extends Action {
    payload: {uriKey: string};
}

type TDownloadActions = IHeicProcessingAction | IHeicProcessingDoneAction;

export default function (state: IHeicProcessingState = initialState, action: TDownloadActions): IHeicProcessingState {
    switch (action.type) {
        case download.HEIC_PROCESSING:
            const {uriKey: processingUriKey} = action.payload as IHeicProcessingAction['payload'];
            return {...state, [processingUriKey]: true};

        case download.HEIC_PROCESSING_DONE:
            const {uriKey: doneUriKey} = action.payload as IHeicProcessingDoneAction['payload'];
            const newState = {...state};
            delete newState[doneUriKey];
            return newState;

        default:
            return state;
    }
}

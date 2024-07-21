import {Action} from 'redux';
import {progress} from '../actions/actionTypes';

export interface IProgressState {
    loading: boolean;
}

export const initialState: IProgressState = {
    loading: false,
};

export type IStartLoadingAction = Action;

type TProgressActions = IStartLoadingAction;

export default function (state: IProgressState = initialState, action: TProgressActions): IProgressState {
    switch (action.type) {
        case progress.START_LOADING:
            return {...state, loading: true};

        case progress.END_LOADING:
            return {...state, loading: false};

        default:
            return state;
    }
}

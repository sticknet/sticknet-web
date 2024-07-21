import {Action} from 'redux';
import {auth} from '../actions/actionTypes';

export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    vaultStorage?: number;
    [key: string]: any;
}

export interface IAuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    isLoading?: boolean;
}

export const authInitialState: IAuthState = {
    user: null,
    isAuthenticated: false,
};

export interface IDispatchUserAction extends Action {
    payload: IUser;
}

export interface IUserLoadedAction extends Action {
    payload: IUser;
}

export interface IUpdateUserAction extends Action {
    payload: Partial<IUser>;
}

export interface IUpdateStorageUsedAction extends Action {
    payload: number;
}

type TAuthActions = IDispatchUserAction | IUserLoadedAction | IUpdateUserAction | IUpdateStorageUsedAction;

export default function (state: IAuthState = authInitialState, action: TAuthActions): IAuthState {
    switch (action.type) {
        case auth.DISPATCH_USER:
            const dispatchUserPayload = action.payload as IDispatchUserAction['payload'];
            return {...state, user: dispatchUserPayload};

        case auth.USER_LOADED:
            const userLoadedPayload = action.payload as IUserLoadedAction['payload'];
            return {...state, isAuthenticated: true, isLoading: false, user: {...state.user, ...userLoadedPayload}};

        case auth.UPDATE_USER:
            const updateUserPayload = action.payload as IUpdateUserAction['payload'];
            return {...state, user: {...state.user, ...updateUserPayload}};

        case auth.UPDATE_STORAGE_USED:
            const updateStorageUsedPayload = action.payload as IUpdateStorageUsedAction['payload'];
            return {
                ...state,
                user: {...state.user, vaultStorage: (state.user?.vaultStorage ?? 0) + updateStorageUsedPayload},
            };

        case auth.LOGOUT_SUCCESSFUL:
            return authInitialState;

        default:
            return state;
    }
}

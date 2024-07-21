import {Action} from 'redux';
import {app} from '../actions/actionTypes';
import {TTarget} from '../types';

export interface IAppState {
    phone: string;
    email: string;
    imagesUrls: {[key: string]: string};
    shouldReqContactsPermission: boolean;
    initialized: boolean;
    preferences: {folderIcon: string};
    currentDeviceId: string | null;
    subscription: {
        platform: string;
        expires: string | null;
    };
    currentTarget: TTarget | null;
    profilePictureUri: string | null;
}

export const appInitialState: IAppState = {
    phone: '',
    email: '',
    imagesUrls: {},
    shouldReqContactsPermission: true,
    initialized: false,
    preferences: {folderIcon: 'blue'},
    currentDeviceId: null,
    subscription: {
        platform: 'ios',
        expires: null,
    },
    currentTarget: null,
    profilePictureUri: null,
};

export interface IConfirmNumberResponseAction extends Action {
    payload: {phone: string};
}

export interface ICurrentDeviceIdAction extends Action {
    payload: string;
}

export interface IUserPreferencesAction extends Action {
    payload: {[key: string]: any};
}

export interface IDispatchEmailAction extends Action {
    payload: {email: string};
}

export interface IDispatchSubscriptionDetailsAction extends Action {
    payload: {platform: string; expires: string};
}

export interface IProfilePictureAction extends Action {
    payload: string;
}

type TAppActions =
    | IConfirmNumberResponseAction
    | ICurrentDeviceIdAction
    | IUserPreferencesAction
    | IDispatchEmailAction
    | IDispatchSubscriptionDetailsAction
    | IProfilePictureAction;

export default function (state: IAppState = appInitialState, action: TAppActions): IAppState {
    switch (action.type) {
        case app.CONFIRM_NUMBER_RESPONSE:
            const confirmNumberResponsePayload = action.payload as IConfirmNumberResponseAction['payload'];
            return {...state, phone: confirmNumberResponsePayload.phone};

        case app.INITIALIZED:
            return {...state, initialized: true};

        case app.CURRENT_DEVICE_ID:
            const currentDeviceIdPayload = action.payload as ICurrentDeviceIdAction['payload'];
            return {...state, currentDeviceId: currentDeviceIdPayload};

        case app.USER_PREFERENCES:
            const userPreferencesPayload = action.payload as IUserPreferencesAction['payload'];
            return {...state, preferences: {...state.preferences, ...userPreferencesPayload}};

        case app.DISPATCH_EMAIL:
            const dispatchEmailPayload = action.payload as IDispatchEmailAction['payload'];
            return {...state, email: dispatchEmailPayload.email};

        case app.DISPATCH_SUBSCRIPTION_DETAILS:
            const dispatchSubscriptionDetailsPayload = action.payload as IDispatchSubscriptionDetailsAction['payload'];
            return {...state, subscription: dispatchSubscriptionDetailsPayload};

        case app.PROFILE_PICTURE:
            const profilePicturePayload = action.payload as IProfilePictureAction['payload'];
            return {...state, profilePictureUri: profilePicturePayload};

        case app.RESET_APP_STATE:
            return appInitialState;

        default:
            return state;
    }
}

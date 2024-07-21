import storage from 'redux-persist/lib/storage';
import {Dispatch} from 'redux';
import axios from '../myaxios';
import {API} from '../URL';
import {progress, app, auth} from '../actionTypes';

export function checkout() {
    return async function (dispatch: Dispatch) {
        dispatch({type: progress.START_LOADING});
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        const response = await axios.post(`${API}/api/web-checkout/`, {}, config);
        window.location.href = response.data.url;
        setTimeout(() => dispatch({type: progress.END_LOADING}), 3000);
    };
}

export function billingPortal() {
    return async function (dispatch: Dispatch) {
        dispatch({type: progress.START_LOADING});
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        const response = await axios.post(`${API}/api/web-billing-portal/`, {}, config);
        window.location.href = response.data.url;
        setTimeout(() => dispatch({type: progress.END_LOADING}), 3000);
    };
}

export function fetchSubscriptionDetails() {
    return async function (dispatch: Dispatch) {
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        const response = await axios.get(`${API}/api/fetch-subscription-details/`, config);
        dispatch({type: app.DISPATCH_SUBSCRIPTION_DETAILS, payload: response.data});
        dispatch({type: auth.UPDATE_USER, payload: response.data});
    };
}

export function cancelSubscription(callback: () => void) {
    return async function (dispatch: Dispatch) {
        dispatch({type: progress.START_LOADING});
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        await axios.post(`${API}/api/cancel-web-subscription/`, {}, config);
        dispatch({type: progress.END_LOADING});
        callback();
    };
}

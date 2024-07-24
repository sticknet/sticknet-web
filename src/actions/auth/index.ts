import storage from 'redux-persist/lib/storage';
import argon2 from 'argon2-browser';
import base64 from 'base64-js';
import {Dispatch} from 'redux';
import {progress, app, auth, vault, fetched, appTemp} from '../actionTypes';
import {globalData} from '../globalVariables';
import axios from '../myaxios';
import {API} from '../URL';
import {getOSAndBrowser} from '../../utils';

export function requestEmailCode(email: string, callback: () => void = () => {}, failCallback: () => void = () => {}) {
    return async function (dispatch: Dispatch) {
        globalData.authId = email;
        dispatch({type: progress.START_LOADING});
        const {data} = await axios.post(`${API}/api/request-email-code/`, {email, platform: 'web'}, {});
        if (!data.registered) {
            failCallback();
            dispatch({type: progress.END_LOADING});
            setTimeout(() => alert('You need to create an account!'), 100);
            return;
        }
        dispatch({type: app.DISPATCH_EMAIL, payload: {email}});
        dispatch({type: progress.END_LOADING});
        callback();
    };
}

export function verifyEmailCode(code: string, email: string, callback: () => void, failCallback: () => void) {
    return async function (dispatch: Dispatch) {
        dispatch({type: progress.START_LOADING});
        const response = await axios.post(`${API}/api/verify-email-code/`, {code, email}, {});
        if (!response.data.correct) {
            dispatch({type: progress.END_LOADING});
            alert('Incorrect code!');
            failCallback();
            return;
        }
        await storage.setItem('@email', email);
        handleCodeVerified(response, email, dispatch, callback);
    };
}

async function handleCodeVerified(response: any, authId: string, dispatch: Dispatch, callback: () => void) {
    globalData.limitedAccessToken = response.data.limitedAccessToken;
    await storage.setItem('#LimitedAccessToken', response.data.limitedAccessToken);
    await storage.setItem('@userId', response.data.userId);
    await storage.setItem('@username', response.data.username);
    const phone = authId.startsWith('+') ? authId : null;
    const email = authId.startsWith('+') ? null : authId;
    await dispatch({
        type: auth.DISPATCH_USER,
        payload: {id: response.data.userId, phone, email, username: response.data.username},
    });
    globalData.passwordKey = response.data.passwordKey;
    await storage.setItem('#PasswordSalt', response.data.passwordSalt);
    callback();
    dispatch({type: progress.END_LOADING});
}

export function login(password: string, callback: () => void) {
    return async function (dispatch: Dispatch) {
        dispatch({type: progress.START_LOADING});
        const token = globalData.limitedAccessToken;
        const config = {headers: {Authorization: token}};
        const phone = await storage.getItem('@phone');
        const email = await storage.getItem('@email');
        const body: any = {phone, email};
        const deviceId = 'deviceId';
        body.deviceId = deviceId;
        dispatch({type: app.CURRENT_DEVICE_ID, payload: deviceId});
        body.deviceName = getOSAndBrowser();

        const passwordSalt = await storage.getItem('#PasswordSalt');
        const initialPasswordHash = await argon2.hash({
            pass: password,
            salt: base64.toByteArray(passwordSalt!),
            type: argon2.ArgonType.Argon2id,
            mem: 4 * 1024,
            parallelism: 2,
            time: 3,
            hashLen: 32,
        });
        body.passwordHash = base64.fromByteArray(initialPasswordHash.hash);
        axios
            .post(`${API}/api/web-login/`, body, config)
            .then(async (response) => {
                if (response.data.correct) {
                    await storage.setItem('#Password', password);
                    dispatch({type: progress.END_LOADING});
                    globalData.limitedAccessToken = null;
                    globalData.passwordKey = null;
                    storage.removeItem('#LimitedAccessToken');
                    globalData.token = `Token ${response.data.token}`;
                    storage.setItem('#AuthToken', `Token ${response.data.token}`);
                    await dispatch({type: auth.USER_LOADED, payload: response.data.user});
                    storage.setItem('@loggedIn', '1');
                    await callback();
                } else {
                    dispatch({type: progress.END_LOADING});
                    if (!response.data.blocked) alert('The password you entered is incorrect!');
                    else {
                        alert('Temporarily blocked due to too many requests!');
                    }
                }
            })
            .catch(async (error) => {
                dispatch({type: progress.END_LOADING});
                if (error.toString().includes('401')) {
                    alert('Your session has expired');
                } else {
                    console.warn('error', error);
                    alert(`Unknown Error: ${error.toString()}`);
                }
            });
    };
}

export function logout(callback: () => void) {
    return async function (dispatch: Dispatch) {
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        try {
            await axios.post(`${API}/api/auth/logout/`, {}, config);
            await processLogout(dispatch, callback);
        } catch (e) {
            await processLogout(dispatch, callback);
        }
    };
}

async function processLogout(dispatch: Dispatch, callback: () => void) {
    await dispatch({type: auth.LOGOUT_SUCCESSFUL});
    if (callback) await callback();
    storage.removeItem('#AuthToken');
    storage.removeItem('#PasswordSalt');
    storage.removeItem('@phone');
    storage.removeItem('@userId');
    storage.removeItem('@username');
    storage.removeItem('@loggedIn');
    if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
    }
    dispatch({type: fetched.RESET_FETCHED});
    dispatch({type: app.RESET_APP_STATE});
    dispatch({type: appTemp.RESET_APP_TEMP_STATE});
    dispatch({type: vault.LOGOUT_FILES});
    dispatch({type: vault.LOGOUT_FILES_TREE});
    dispatch({type: vault.LOGOUT_PHOTOS});
    dispatch({type: vault.LOGOUT_ALBUMS});
    dispatch({type: vault.LOGOUT_NOTES});
    dispatch({type: fetched.RESET_FETCHED});
}

export function refreshUser() {
    return async function (dispatch: Dispatch) {
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        let response;
        try {
            response = await axios.get(`${API}/api/refresh-user/`, config);
        } catch (e) {
            processLogout(dispatch, () => (window.location.href = '/portal-login'));
        }
        dispatch({type: auth.USER_LOADED, payload: response?.data.user});
        const {data} = await axios.get(`${API}/api/fetch-preferences/`, config);
        dispatch({type: app.USER_PREFERENCES, payload: data});
    };
}

export function fetchDevices() {
    return async function (dispatch: Dispatch) {
        const config = {headers: {Authorization: (await storage.getItem('#LimitedAccessToken')) as string}};
        const phone = await storage.getItem('@phone');
        const email = await storage.getItem('@email');
        let data;
        try {
            const response = await axios.post(`${API}/api/fetch-devices/`, {phone, email, currentDeviceId: ''}, config);
            data = response.data;
        } catch (error: any) {
            if (error.toString().includes('401')) {
                alert('Your Session has expired, you need to verify your email/phone again');
                await processLogout(dispatch, () => {});
            } else {
                alert(`Unknown Error: ${error.toString()}`);
            }
            return;
        }
        dispatch({type: appTemp.FETCH_DEVICES, payload: data});
    };
}
import storage from 'redux-persist/lib/storage';
import {Dispatch} from 'redux';
import {fromByteArray} from 'base64-js';
import {app, appTemp, auth, fetched, progress, vault} from '../actionTypes';
import {globalData} from '../globalVariables';
import axios from '../myaxios';
import {API} from '../URL';
import {createPasswordHash, getOSAndBrowser, secureStorage} from '../../utils';

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
        handleUserVerified(response, email, 'email', dispatch, callback);
    };
}

export function handleWalletVerified({ethereumAddress, callback}: {ethereumAddress: string; callback: () => void}) {
    return async function (dispatch: Dispatch) {
        try {
            dispatch({type: progress.START_LOADING});
            // const response = await axios.post(`${API}/api/wallet-verified/`, {ethereumAddress});
            await storage.setItem('@ethereumAddress', ethereumAddress);
            const walletVerifyResponse = globalData.walletVerifyResponse;
            globalData.walletVerifyResponse = null;
            handleUserVerified(walletVerifyResponse, ethereumAddress, 'wallet', dispatch, callback);
        } catch (e) {
            console.warn('ERROR', e);
            dispatch({type: progress.END_LOADING});
        }
    };
}

async function handleUserVerified(
    response: any,
    authId: string,
    method: string,
    dispatch: Dispatch,
    callback: () => void,
) {
    globalData.limitedAccessToken = response.data.limitedAccessToken;
    await storage.setItem('#LimitedAccessToken', response.data.limitedAccessToken);
    await storage.setItem('@userId', response.data.userId);
    await storage.setItem('@username', response.data.username);
    const ethereumAddress = method === 'wallet' ? authId : null;
    const email = method === 'email' ? authId : null;
    await dispatch({
        type: auth.DISPATCH_USER,
        payload: {id: response.data.userId, ethereumAddress, email, username: response.data.username},
    });
    globalData.passwordKey = response.data.passwordKey;
    globalData.accountSecret = response.data.accountSecret;
    await storage.setItem('#PasswordSalt', response.data.passwordSalt);
    callback();
    dispatch({type: progress.END_LOADING});
}

export function getWebKey() {
    return async function () {
        const authToken = await storage.getItem('#AuthToken');
        const config = {headers: {Authorization: authToken as string}};
        const response = await axios.get(`${API}/api/get-web-key/`, config);
        if (response.data.webKey) {
            globalData.webKey = response.data.webKey;
        } else {
            await setWebKey(authToken as string);
        }
    };
}

const setWebKey = async (authToken: string) => {
    const webKeyBytes = window.crypto.getRandomValues(new Uint8Array(32));
    globalData.webKey = fromByteArray(webKeyBytes);
    const config = {headers: {Authorization: authToken}};
    await axios.post(`${API}/api/set-web-key/`, {webKey: globalData.webKey}, config);
};

export function login(password: string, callback: () => void) {
    return async function (dispatch: Dispatch) {
        dispatch({type: progress.START_LOADING});
        const token = globalData.limitedAccessToken;
        const config = {headers: {Authorization: token}};
        const ethereumAddress = await storage.getItem('@ethereumAddress');
        const email = await storage.getItem('@email');
        const body: any = {ethereumAddress, email};
        const deviceId = 'deviceId';
        body.deviceId = deviceId;
        dispatch({type: app.CURRENT_DEVICE_ID, payload: deviceId});
        body.deviceName = getOSAndBrowser();
        const passwordSalt = await storage.getItem('#PasswordSalt');
        body.passwordHash = await createPasswordHash(password, passwordSalt!);
        axios
            .post(`${API}/api/web-login/`, body, config)
            .then(async (response) => {
                if (response.data.correct) {
                    if (!response.data.webKey) await setWebKey(`Token ${response.data.token}`);
                    else globalData.webKey = response.data.webKey;
                    await secureStorage.setItem('#Password', password);
                    dispatch({type: progress.END_LOADING});
                    globalData.limitedAccessToken = null;
                    globalData.passwordKey = null;
                    globalData.accountSecret = null;
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
            await axios.get(`${API}/api/flush-session/`, config);
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
        const authToken = await storage.getItem('#AuthToken');
        const config = {headers: {Authorization: authToken as string}};
        let response;
        try {
            response = await axios.get(`${API}/api/refresh-user/?web=1`, config);
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

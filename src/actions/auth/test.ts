import {waitFor} from '@testing-library/react';
import configureStore from '../../store';
import axiosMock from '../test_data/axiosMock';
import {auth} from '..';
import {authInitialState} from '../../reducers/auth';
import {appInitialState} from '../../reducers/app';
import {appTempInitialState} from '../../reducers/appTemp';
import {globalData} from '../globalVariables';

describe('auth.js actions functions', () => {
    let store: ReturnType<typeof configureStore>['store'];

    beforeEach(() => {
        axiosMock();
        const config = configureStore({});
        store = config.store;
    });

    test('requestEmailCode()', async () => {
        const email = 'test@test.com';

        expect(store.getState().app.email).toBe('');

        const func = auth.requestEmailCode(email, jest.fn(), jest.fn());
        await waitFor(() => func(store.dispatch));

        expect(store.getState().app.email).toBe(email);
        expect(store.getState().progress.loading).toBe(false);
    });

    test('verifyEmailCode()', async () => {
        const code = '123456';
        const email = 'test@test.com';

        expect(store.getState().auth.user).toBeNull();

        const func = auth.verifyEmailCode(code, email, jest.fn(), jest.fn());
        await waitFor(() => func(store.dispatch));

        expect(store.getState().auth.user?.email).toBe(email);
        expect(store.getState().progress.loading).toBe(false);
    });

    test('login() - success', async () => {
        const password = 'password';
        globalData.limitedAccessToken = 'test_token';

        expect(store.getState().auth.user).toBeNull();

        const func = auth.login(password, jest.fn());
        await waitFor(() => func(store.dispatch));

        expect(store.getState().auth.user).toEqual({
            id: 'userX',
            email: 'test@test.com',
            groups: [{id: 'groupX'}],
        });
        expect(store.getState().progress.loading).toBe(false);
    });

    test('logout()', async () => {
        globalData.token = 'test_token';

        const func = auth.logout(jest.fn());
        await waitFor(() => func(store.dispatch));

        const updatedState = store.getState();
        expect(updatedState.auth).toStrictEqual(authInitialState);
        expect(updatedState.app).toStrictEqual(appInitialState);
        expect(updatedState.appTemp).toStrictEqual(appTempInitialState);
    });

    test('fetchDevices()', async () => {
        expect(store.getState().appTemp.devices).not.toStrictEqual([{id: 'deviceA'}]);

        const func = auth.fetchDevices();
        await waitFor(() => func(store.dispatch));

        expect(store.getState().appTemp.devices).toStrictEqual([{id: 'deviceA'}]);
    });
});

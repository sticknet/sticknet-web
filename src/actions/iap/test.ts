import {waitFor} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from '../../store';
import {API} from '../URL';
import {iap} from '..';

describe('iap actions', () => {
    let store: ReturnType<typeof configureStore>['store'];

    beforeEach(() => {
        axiosMock.reset();
        const config = configureStore({});
        store = config.store;
    });

    const axiosMock = new MockAdapter(axios);

    test('checkout() updates state and redirects to checkout URL', async () => {
        const checkoutUrl = 'http://checkout.url';
        axiosMock.onPost(`${API}/api/web-checkout/`).reply(200, {url: checkoutUrl});

        Object.defineProperty(window, 'location', {
            value: {
                href: '',
            },
            writable: true,
        });

        await waitFor(() => store.dispatch<any>(iap.checkout()));

        expect(window.location.href).toBe(checkoutUrl);
    });

    test('billingPortal() updates state and redirects to billing portal URL', async () => {
        const billingPortalUrl = 'http://billing.portal.url';
        axiosMock.onPost(`${API}/api/web-billing-portal/`).reply(200, {url: billingPortalUrl});

        Object.defineProperty(window, 'location', {
            value: {
                href: '',
            },
            writable: true,
        });

        await waitFor(() => store.dispatch<any>(iap.billingPortal()));

        expect(window.location.href).toBe(billingPortalUrl);
    });

    test('fetchSubscriptionDetails() updates subscription details in state', async () => {
        const subscriptionDetails = {id: 'sub123', status: 'active'};
        axiosMock.onGet(`${API}/api/fetch-subscription-details/`).reply(200, subscriptionDetails);

        await waitFor(() => store.dispatch<any>(iap.fetchSubscriptionDetails()));

        const state = store.getState();
        expect(state.app.subscription).toEqual(subscriptionDetails);
        expect(state.auth.user).toEqual(subscriptionDetails);
    });

    test('cancelSubscription() updates state and calls callback', async () => {
        const callback = jest.fn();
        axiosMock.onPost(`${API}/api/cancel-web-subscription/`).reply(200);

        await waitFor(() => store.dispatch<any>(iap.cancelSubscription(callback)));

        const state = store.getState();
        expect(state.progress.loading).toBe(false);
        expect(callback).toHaveBeenCalled();
    });
});

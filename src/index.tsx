import React, {PureComponent, ComponentType} from 'react';
import {createRoot} from 'react-dom/client';
import {Route, BrowserRouter, Switch, Redirect, RouteComponentProps} from 'react-router-dom';
import {Provider, connect, ConnectedProps} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import * as Sentry from '@sentry/react';

import {NotFound} from './components';
import App from './App';
import HomeScreen from './website/HomeScreen';
import TermsScreen from './website/TermsScreen';
import FAQScreen from './website/FAQScreen';
import QuestionScreen from './website/QuestionScreen';
import DeleteRequestScreen from './website/DeleteRequestScreen';
import ThankScreen from './website/ThankScreen';
import StickProtocolScreen from './website/StickProtocolScreen';
import SPUsageScreen from './website/SPUsageScreen';
import {
    LoginScreen,
    PhotosScreen,
    VaultScreen,
    NotesScreen,
    CreateNoteScreen,
    PremiumScreen,
    WelcomeScreen,
    SubCancelledScreen,
    QRRedirect,
} from './client';
import configureStore from './store';
import {IApplicationState} from './types';
import AppKitProvider from './wallet/AppKitProvider';

Sentry.init({
    dsn: 'https://fdc543e07d78591598c69e65b01b0ab9@o4506009368199168.ingest.sentry.io/4506150014877696',
    integrations: [
        new Sentry.BrowserTracing({
            tracePropagationTargets: ['localhost', /^https:\/\/sticknet\.org\//],
        }),
        new Sentry.Replay(),
    ],
    tracesSampleRate: 0.5,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});

const UID = {
    _current: 0,
    getNew() {
        this._current++;
        return this._current;
    },
};

declare global {
    interface HTMLElement {
        pseudoStyle: (element: string, prop: string, value: string) => HTMLElement;
    }
}

HTMLElement.prototype.pseudoStyle = function(element: string, prop: string, value: string): HTMLElement {
    const _sheetId = 'pseudoStyles';
    const _head = document.head || document.getElementsByTagName('head')[0];
    const _sheet = (document.getElementById(_sheetId) as HTMLStyleElement) || document.createElement('style');
    _sheet.id = _sheetId;
    const className = `pseudoStyle${UID.getNew()}`;

    this.classList.add(className);

    _sheet.innerHTML += ` .${className}::${element}{${prop}:${value}}`;
    _head.appendChild(_sheet);

    return this;
};

const {persistor, store} = configureStore();

type RootContainerProps = ConnectedProps<typeof connector>;

class RootContainerComponent extends PureComponent<RootContainerProps> {
    PrivateRoute = ({
                        component: ChildComponent,
                        ...rest
                    }: {
        component: ComponentType<RouteComponentProps>;
        [key: string]: any;
    }) => {
        return (
            <Route
                {...rest}
                render={(props) => {
                    if (!this.props.user) return <Redirect to="/portal-login" />;
                    return <ChildComponent {...props} />;
                }}
            />
        );
    };

    render() {
        const {PrivateRoute} = this;
        return (
            <AppKitProvider>
                <BrowserRouter>
                    <App>
                        <Switch>
                            <Route exact path="/" component={HomeScreen} />
                            <Route exact path="/legal" component={TermsScreen} />
                            <Route exact path="/faq" component={FAQScreen} />
                            <Route exact path="/support" component={QuestionScreen} />
                            <Route exact path="/account-deletion-request" component={DeleteRequestScreen} />
                            <Route exact path="/thank-you" component={ThankScreen} />
                            <Route exact path="/stick-protocol" component={StickProtocolScreen} />
                            <Route exact path="/stick-protocol/usage-documentation" component={SPUsageScreen} />
                            <Route exact path="/portal-login" component={LoginScreen} />
                            <Route exact path="/qr-redirect" component={QRRedirect} />
                            <Route exact path="/app" component={QRRedirect} />
                            <Route exact path="/premium" component={PremiumScreen} />
                            <PrivateRoute exact path="/welcome-to-premium" component={WelcomeScreen} />
                            <PrivateRoute exact path="/subscription-cancelled" component={SubCancelledScreen} />
                            <PrivateRoute path="/vault/files" component={VaultScreen} />
                            <PrivateRoute exact path="/vault/photos" component={PhotosScreen} />
                            <PrivateRoute exact path="/vault/notes" component={NotesScreen} />
                            <PrivateRoute exact path="/vault/notes/create-note" component={CreateNoteScreen} />
                            <Route component={NotFound} />
                        </Switch>
                    </App>
                </BrowserRouter>
            </AppKitProvider>
        );
    }
}

function mapStateToProps(state: IApplicationState) {
    return {
        user: state.auth.user,
    };
}

const connector = connect(mapStateToProps);
const RootContainer = connector(RootContainerComponent);

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RootContainer />
        </PersistGate>
    </Provider>,
);

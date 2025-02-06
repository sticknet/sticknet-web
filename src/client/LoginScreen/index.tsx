import React, {useState, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {useHistory} from 'react-router-dom';

import gs from '../../global.css';
import {auth} from '../../actions';
import AuthenticationForm from './AuthenticationForm';
import CodeForm from './CodeForm';
import PasswordForm from './PasswordForm';
import QRView from './QRView';
import PasswordRecovery from './PasswordRecovery';
import {IApplicationState} from '../../types';
import WalletPasswordForm from './WalletPasswordForm';

type PropsFromRedux = ConnectedProps<typeof connector>;
type LoginScreenProps = PropsFromRedux;

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
    const history = useHistory();
    const [form, setForm] = useState('authentication');

    useEffect(() => {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            history.push('/');
        }
    }, []);

    useEffect(() => {
        if (props.isAuthenticated && props.user) {
            window.location.href = '/vault/files';
        }
        const unlisten = history.listen((location, action) => {
            if (action === 'POP' && form === 'qr') {
                window.history.pushState({}, '', '/portal-login');
                setForm('authentication');
            }
            if (action === 'POP' && form === 'passwordRecovery') {
                window.history.pushState({}, '', '/portal-login');
                setTimeout(() => setForm('password'), 0);
            }
        });
        return () => {
            unlisten();
        };
    }, [form]);

    return (
        <div className={gs.main}>
            <div className={`${gs.screenContainer} ${gs.centerScreen}`}>
                <div className={gs.box}>
                    {form === 'passwordRecovery' ? (
                        <h1>Password Recovery</h1>
                    ) : form === 'qr' ? (
                        <h1>
                            Download <span style={{fontFamily: 'Sirin Stencil'}}>Sticknet</span> app
                        </h1>
                    ) : (
                        <h1>Login to access your Vault</h1>
                    )}
                    {form === 'authentication' ? (
                        <AuthenticationForm setForm={setForm} />
                    ) : form === 'code' ? (
                        <CodeForm setForm={setForm} />
                    ) : form === 'password' ? (
                        <PasswordForm setForm={setForm} />
                    ) : form === 'qr' ? (
                        <QRView />
                    ) : form === 'passwordRecovery' ? (
                        <PasswordRecovery />
                    ) : form === 'walletPassword' ? (
                        <WalletPasswordForm />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    country: state.appTemp.country,
    phone: state.app.phone,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

const connector = connect(mapStateToProps, {...auth});

export default connector(LoginScreen);

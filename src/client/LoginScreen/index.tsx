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

type PropsFromRedux = ConnectedProps<typeof connector>;
type LoginScreenProps = PropsFromRedux;

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
    const history = useHistory();
    const [formNumber, setFormNumber] = useState(0);

    useEffect(() => {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            history.push('/');
        }
    }, []);

    useEffect(() => {
        if (props.isAuthenticated) {
            window.location.href = '/vault/files';
        }
        const unlisten = history.listen((location, action) => {
            if (action === 'POP' && formNumber === 3) {
                window.history.pushState({}, '', '/portal-login');
                setFormNumber(0);
            }
            if (action === 'POP' && formNumber === 4) {
                window.history.pushState({}, '', '/portal-login');
                setTimeout(() => setFormNumber(2), 0);
            }
        });
        return () => {
            unlisten();
        };
    }, [formNumber]);

    return (
        <div className={gs.main}>
            <div className={`${gs.screenContainer} ${gs.centerScreen}`}>
                <div className={gs.box}>
                    {formNumber < 3 ? (
                        <h1>Login to access your Vault</h1>
                    ) : formNumber === 3 ? (
                        <h1>
                            Download <span style={{fontFamily: 'Sirin Stencil'}}>Sticknet</span> app
                        </h1>
                    ) : (
                        <h1>Password Recovery</h1>
                    )}
                    {formNumber === 0 ? (
                        <AuthenticationForm setFormNumber={setFormNumber} />
                    ) : formNumber === 1 ? (
                        <CodeForm setFormNumber={setFormNumber} />
                    ) : formNumber === 2 ? (
                        <PasswordForm setFormNumber={setFormNumber} />
                    ) : formNumber === 3 ? (
                        <QRView />
                    ) : (
                        <PasswordRecovery />
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    country: state.appTemp.country,
    phone: state.app.phone,
    isAuthenticated: state.auth.isAuthenticated,
});

const connector = connect(mapStateToProps, {...auth});

export default connector(LoginScreen);

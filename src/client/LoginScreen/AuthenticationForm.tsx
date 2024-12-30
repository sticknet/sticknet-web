import React, {useEffect, useState, ChangeEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {FaEnvelope, FaWallet} from 'react-icons/fa6';
// eslint-disable-next-line import/no-unresolved
import {useAppKit} from '@reown/appkit/react';
import s from './style.css';
import {Button} from '../../components';
import {auth} from '../../actions';
import Input from '../../components/Input';
import {validateEmail} from '../../utils';
import {colors} from '../../foundations';
import {IApplicationState} from '../../types';

interface AuthenticationFormProps extends PropsFromRedux {
    setForm: (formName: string) => void;
}

const AuthenticationForm: React.FC<AuthenticationFormProps> = (props) => {
    const [email, setEmail] = useState<string>('');
    const handleKeydown = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleButton();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [email]);

    useEffect(() => {
        if (props.walletVerified)
            props.handleWalletVerified({
                ethereumAddress: props.walletVerified,
                callback: () => props.setForm('walletPassword'),
            });
    }, [props.walletVerified]);

    const handleButton = () => {
        if (validateEmail(email)) {
            props.requestEmailCode(
                email.toLowerCase(),
                () => props.setForm('code'),
                () => props.setForm('qr'),
            );
        } else {
            alert('Invalid email!');
        }
    };

    const {open} = useAppKit();

    return (
        <div className={s.formContainer}>
            <img
                src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/sticknet-icon.png?alt=media&token=2b665dae-a63d-4884-a92e-59d5899530dc'
                className={s.sticknetIcon}
                alt='Sticknet Icon'
            />
            <Input
                placeholder='Your email'
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                style={{marginBottom: '12px'}}
            />
            <Button
                text='Login with email'
                onClick={handleButton}
                id='continue'
                icon={<FaEnvelope color='#ffffff' size={18} />}
            />
            <div className={s.separatorContainer}>
                <div className={s.line} />
                <span className={s.orText}>or</span>
                <div className={s.line} />
            </div>
            <Button
                text='Login with wallet'
                onClick={open}
                id='continue-wallet'
                icon={<FaWallet color='#ffffff' size={18} />}
                style={{marginTop: 0, backgroundColor: colors.primary}}
                loadingDisabled
            />
            <button type='button' className={s.dont} onClick={() => props.setForm('qr')}>
                Don't have an account
            </button>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    country: state.appTemp.country,
    walletVerified: state.appTemp.walletVerified,
});

const connector = connect(mapStateToProps, {...auth});
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AuthenticationForm);

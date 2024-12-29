import React, {useEffect, useState, ChangeEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {TfiKey} from 'react-icons/tfi';
import s from './style.css';
import {Button} from '../../components';
import {auth} from '../../actions';
import Input from '../../components/Input';
import {colors} from '../../foundations';

type PropsFromRedux = ConnectedProps<typeof connector>;
interface PasswordFormProps extends PropsFromRedux {
    setForm: (formName: string) => void;
}

const PasswordForm: React.FC<PasswordFormProps> = (props) => {
    const [showPass, setShowPass] = useState(false);
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleKeydown = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'Enter') {
            login();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [password]);

    const login = () => {
        setShowPass(false);
        props.login(password, () => {
            history.push('/vault/files/');
        });
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className={s.formContainer}>
            <div className={s.keyCircle}>
                <TfiKey size={60} color={colors.primary} />
            </div>
            <Input
                placeholder='Enter your password'
                onChange={handlePasswordChange}
                style={{marginTop: '80px'}}
                password
                autoFocus
            />
            <Button text='Log In' id='continue' style={{marginTop: '32px'}} onClick={login} />
            <button type='button' className={s.dont} onClick={() => props.setForm('passwordRecovery')}>
                Forgot password?
            </button>
        </div>
    );
};

const connector = connect(null, {...auth});
export default connector(PasswordForm);

import React, {useEffect, useState, ChangeEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {FaRegEnvelope} from 'react-icons/fa6';
import s from './style.css';
import {Button} from '../../components';
import {auth} from '../../actions';
import Input from '../../components/Input';
import {validateEmail} from '../../utils';
import {colors} from '../../foundations';
import {IApplicationState} from '../../types';

interface AuthenticationFormProps extends PropsFromRedux {
    setFormNumber: (number: number) => void;
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

    const handleButton = () => {
        if (validateEmail(email)) {
            props.requestEmailCode(
                email.toLowerCase(),
                () => props.setFormNumber(1),
                () => props.setFormNumber(3),
            );
        } else {
            alert('Invalid email!');
        }
    };

    return (
        <div className={s.formContainer}>
            <div className={s.keyCircle}>
                <FaRegEnvelope size={60} color={colors.primary} />
            </div>
            <Input
                placeholder='Your email'
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                style={{marginBottom: '12px'}}
            />
            <Button text='Continue' onClick={handleButton} id='continue' />
            <button type='button' className={s.dont} onClick={() => props.setFormNumber(3)}>
                Don't have an account
            </button>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    country: state.appTemp.country,
});

const connector = connect(mapStateToProps, {...auth});
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AuthenticationForm);

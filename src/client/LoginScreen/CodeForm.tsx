import React, {useEffect, useState, ChangeEvent, KeyboardEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import s from './style.css';
import {Button} from '../../components';
import {auth} from '../../actions';
import {globalData} from '../../actions/globalVariables';
import {IApplicationState} from '../../types';

interface CodeFormProps extends PropsFromRedux {
    setForm: (formName: string) => void;
}

const CodeForm: React.FC<CodeFormProps> = (props) => {
    const [timer, setTimer] = useState<number>(60);
    const [input, setInput] = useState<string>('');
    const currentTime = new Date().getTime();
    const pinInputs = Array.from({length: 6}, () => React.createRef<HTMLInputElement>());

    const handleInput = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const {value} = event.target;
        if (value.length > 1) {
            pinInputs[index].current!.value = value[value.length - 1];
        }
        if (index < pinInputs.length - 1 && value !== '') {
            pinInputs[index + 1].current!.focus();
        }
        setInput(pinInputs.map((ref, idx) => (idx === index ? value[value.length - 1] : ref.current!.value)).join(''));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
        const target = event.target as HTMLInputElement;
        const {key} = event;
        const {value} = target;
        if (key === 'Backspace' && index > 0 && pinInputs[index].current!.value === '') {
            pinInputs[index - 1].current!.focus();
        }
        setInput(pinInputs.map((ref, idx) => (idx === index ? value[value.length - 1] : ref.current!.value)).join(''));
    };

    let timerCounter: NodeJS.Timeout;
    const timing = (currentTime: number) => {
        setTimer(60 - (new Date().getTime() - currentTime) / 1000);
        if (timer <= 0) {
            clearInterval(timerCounter);
        }
    };

    useEffect(() => {
        pinInputs[0].current!.focus();
        timerCounter = setInterval(() => timing(currentTime), 1000);
        return () => {
            clearInterval(timerCounter);
        };
    }, []);

    useEffect(() => {
        if (input.length === 6) {
            props.verifyEmailCode(
                input,
                props.email,
                () => props.setForm('password'),
                () => {
                    pinInputs.forEach((ref) => (ref.current!.value = ''));
                    pinInputs[0].current!.focus();
                    setInput('');
                },
            );
        }
    }, [input.length === 6]);

    const resend = () => {
        props.requestEmailCode(
            globalData.authId,
            () => props.setForm('code'),
            () => props.setForm('qr'),
        );
    };

    return (
        <div className={s.formContainer}>
            <p className={s.description}>
                Enter the verification code sent to {'\n'}
                <b>{globalData.authId}</b>
            </p>
            <div className={s.pinContainer}>
                {pinInputs.map((ref, index) => (
                    <input
                        key={index}
                        type='number'
                        maxLength={1}
                        className={s.pinInput}
                        ref={ref}
                        onInput={(e) => handleInput(e as ChangeEvent<HTMLInputElement>, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}
            </div>
            <Button text='Continue' id='continue' />
            <button type='button' className={s.resend} style={{textDecorationLine: 'underline'}} onClick={resend}>
                <p>Resend Code</p>
            </button>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    country: state.appTemp.country,
    phone: state.app.phone,
    email: state.app.email,
});

const connector = connect(mapStateToProps, {...auth});
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CodeForm);

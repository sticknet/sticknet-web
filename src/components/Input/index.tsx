import React, {FC, ChangeEvent, CSSProperties} from 'react';
import s from './style.css';

interface InputProps {
    autoFocus?: boolean;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    value?: string;
    style?: CSSProperties;
    password?: boolean;
}

const Input: FC<InputProps> = ({autoFocus, placeholder, onChange, width, value, style, password}) => {
    return (
        <input
            className={s.input}
            style={{width, ...style}}
            autoFocus={autoFocus}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            type={password ? 'password' : 'text'}
        />
    );
};

export default Input;

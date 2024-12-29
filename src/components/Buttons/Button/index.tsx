import React, {ReactNode} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Loading from '../../Loading';
import s from './style.css';
import type {IApplicationState} from '../../../types';
import type {IconType} from 'react-icons';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    id?: string;
    style?: React.CSSProperties;
    colored?: boolean;
    icon?: ReactNode;
}

const mapStateToProps = (state: IApplicationState) => ({
    loading: state.progress.loading,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ButtonProps & PropsFromRedux;

interface ButtonTextProps {
     text: string;
    icon?: React.ReactNode | undefined;
}

export const ButtonText = ({icon, text}: ButtonTextProps) => {
    return (
        <div className={s.innerContainer}>
            <div style={{paddingRight: 8}}>{icon}</div>
            <p className={s.text}>{text}</p>
        </div>
    );
};

const Button: React.FC<Props> = ({text, onClick, id, loading, style, colored, icon}) => {
    return (
        <button
            className={`${s.button} ${colored ? s.colored : s.black}`}
            style={style}
            type="button"
            onClick={() => {
                if (!loading) onClick?.();
            }}
            id={id}>
            {loading ? <Loading colored={colored} /> : <ButtonText icon={icon} text={text} />}
        </button>
    );
};

export default connector(Button);

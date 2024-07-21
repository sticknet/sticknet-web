import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Loading from '../../Loading';
import s from './style.css';
import {IApplicationState} from '../../../types';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    id?: string;
    style?: React.CSSProperties;
    colored?: boolean;
}

const mapStateToProps = (state: IApplicationState) => ({
    loading: state.progress.loading,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ButtonProps & PropsFromRedux;

const Button: React.FC<Props> = ({text, onClick, id, loading, style, colored}) => {
    return (
        <button
            className={`${s.button} ${colored ? s.colored : s.black}`}
            style={style}
            type='button'
            onClick={() => {
                if (!loading) onClick?.();
            }}
            id={id}>
            {loading ? <Loading colored={colored} /> : <p className={s.text}>{text}</p>}
        </button>
    );
};

export default connector(Button);

import {Link} from 'react-router-dom';
import React, {ReactNode} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import s from './style.css';
import Loading from '../../Loading';
import {IApplicationState} from '../../../types';
import {ButtonText} from '../Button';

interface AnimatedButtonProps {
    clickable?: boolean;
    onClick?: () => void;
    to?: string;
    text: string;
    style?: string;
    icon?: ReactNode;
}

const mapStateToProps = (state: IApplicationState) => ({
    loading: state.progress.loading,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = AnimatedButtonProps & PropsFromRedux;

const AnimatedButton: React.FC<Props> = (props) => {
    if (props.clickable)
        return (
            <button type="button" className={s.buttonContainer} onClick={props.onClick} style={{width: '50vw'}}>
                <span className={`${s.getStartedButton} ${props.style}`}>
                    {props.loading ? <Loading /> : <ButtonText icon={props.icon} text={props.text} />}
                </span>
            </button>
        );
    return (
        <Link className={s.buttonContainer} to={props.to || ''}>
            <span className={`${s.getStartedButton} ${props.style}`}><ButtonText icon={props.icon} text={props.text} /></span>
        </Link>
    );
};

export default connector(AnimatedButton);

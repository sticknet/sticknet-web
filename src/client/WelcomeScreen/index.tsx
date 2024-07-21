import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Lottie from 'react-lottie';
import {useHistory} from 'react-router-dom';
import gs from '../../global.css';
import s from './style.css';
import {celebrateAnimation} from '../../../assets/lottie';
import {auth} from '../../actions';
import {Button} from '../../components';

type PropsFromRedux = ConnectedProps<typeof connector>;
type WelcomeScreenProps = PropsFromRedux;

const WelcomeScreen: React.FC<WelcomeScreenProps> = (props) => {
    useEffect(() => {
        props.refreshUser();
    }, []);

    const history = useHistory();

    return (
        <div className={gs.main}>
            <div className={`${gs.screenContainer} ${gs.centerScreen}`}>
                <div className={gs.box}>
                    <Lottie
                        options={{
                            loop: true,
                            animationData: celebrateAnimation,
                        }}
                        height={400}
                        width={400}
                        isStopped={false}
                        isPaused={false}
                    />
                    <p className={s.welcome}>
                        Welcome to{' '}
                        <span className={s.sticknet}>
                            Sticknet <span className={s.premium}>Premium</span>
                        </span>
                    </p>
                    <Button
                        text='Back to My Vault'
                        colored
                        onClick={() => history.replace('/vault/files')}
                        style={{marginBottom: '28px', width: '27vw', height: '40px', marginTop: '10vh'}}
                    />
                </div>
            </div>
        </div>
    );
};

const connector = connect(null, {...auth});

export default connector(WelcomeScreen);

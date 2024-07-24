import React from 'react';
import Lottie from 'react-lottie';
import {FaLock} from 'react-icons/fa';
import {syncAnimation} from '../../../assets/lottie';

const isDesktop = window.innerWidth > window.innerHeight;
export const SyncAnimation: React.FC = () => {
    return (
        <div style={s.container}>
            <FaLock style={s.lockIcon} />
            <Lottie
                options={{loop: true, autoplay: true, animationData: syncAnimation}}
                isStopped={false}
                isPaused={false}
                // @ts-ignore
                style={{transform: 'scale(2)'}}
            />
        </div>
    );
};

const s = {
    container: {
        height: isDesktop ? '100%' : '50%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    } as React.CSSProperties,
    lockIcon: {
        fontSize: isDesktop ? '3.5vw' : '12vw',
        color: '#FFFFFF',
        position: 'absolute',
    } as React.CSSProperties,
};

export default SyncAnimation;

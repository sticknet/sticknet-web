import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {TfiLock} from 'react-icons/tfi';
import {HiOutlineDeviceMobile} from 'react-icons/hi';
import s from './style.css';
import {colors} from '../../foundations';
import {auth} from '../../actions';
import {IApplicationState, TDevice} from '../../types';

type PropsFromRedux = ConnectedProps<typeof connector>;
type PasswordRecoveryProps = PropsFromRedux;

const PasswordRecovery: React.FC<PasswordRecoveryProps> = (props) => {
    useEffect(() => {
        props.fetchDevices();
    }, []);

    return (
        <div className={s.formContainer}>
            <div className={s.keyCircle}>
                <TfiLock size={60} color={colors.primary} />
            </div>
            <p style={{marginTop: 40, marginBottom: 20}}>
                You can recover your password from your <span style={{fontFamily: 'Sirin Stencil'}}>Sticknet</span>{' '}
                account on one of your mobile devices:
            </p>
            {props.devices.map((device: TDevice) => {
                return (
                    <div key={device.id} className={s.deviceItem}>
                        <HiOutlineDeviceMobile size={20} color={colors.black} />
                        <p className={s.deviceName}>{device.name}</p>
                    </div>
                );
            })}
            <p style={{marginTop: 20, alignSelf: 'flex-start'}}>
                Go to Profile {'>'} Account {'>'} Recover Password
            </p>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    devices: state.appTemp.devices,
});

const connector = connect(mapStateToProps, {...auth});

export default connector(PasswordRecovery);

import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {TfiKey} from 'react-icons/tfi';
import {useSignMessage} from 'wagmi';
import {useHistory} from 'react-router-dom';
import s from './style.css';
import {Button} from '../../components';
import {auth} from '../../actions';
import {colors} from '../../foundations';
import {globalData} from '../../actions/globalVariables';
import {createPasswordHash} from '../../utils';

type PropsFromRedux = ConnectedProps<typeof connector>;

const WalletPasswordForm: React.FC<PropsFromRedux> = (props) => {
    const {data, signMessage} = useSignMessage();
    const history = useHistory();
    const regeneratePassword = () => {
        const secret = globalData.accountSecret.slice(0, 44);
        signMessage({message: secret});
    };
    useEffect(() => {
        if (data) {
            hashSignedSecret(data);
        }
    }, [data]);
    const hashSignedSecret = async (signedSecret: string) => {
        const salt = globalData.accountSecret.slice(44, 88);
        const password = await createPasswordHash(signedSecret, salt);
        props.login(password, () => {
            history.push('/vault/files/');
        });
    };
    return (
        <div className={s.formContainer}>
            <div className={s.keyCircle}>
                <TfiKey size={60} color={colors.primary} />
            </div>
            <p className={s.description} style={{fontSize: '18px'}}>
                Regenerate password from your wallet to login.
            </p>
            <Button
                text='Sign & Generate password'
                id='continue'
                style={{marginTop: '32px'}}
                onClick={regeneratePassword}
            />
        </div>
    );
};

const connector = connect(null, {...auth});
export default connector(WalletPasswordForm);

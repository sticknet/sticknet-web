import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {unixToDate} from '../../utils';
import gs from '../../global.css';
import s from './style.css';
import {auth} from '../../actions';
import {Button} from '../../components';
import {IApplicationState} from '../../types';

type PropsFromRedux = ConnectedProps<typeof connector>;
type SubCancelledScreenProps = PropsFromRedux;

const SubCancelledScreen: React.FC<SubCancelledScreenProps> = (props) => {
    useEffect(() => {
        props.refreshUser();
    }, []);

    const history = useHistory();

    return (
        <div className={gs.main}>
            <div className={`${gs.screenContainer} ${gs.centerScreen}`}>
                <div className={`${gs.box} ${s.container}`}>
                    <p className={s.welcome}>Subscription has been cancelled</p>
                    <p className={s.text}>
                        Your premium benefits expire on: {unixToDate(props.expires!)}. Please be noted that data
                        exceeding basic storage (1 GB) will be deleted 14 days after the expiration date.
                        <span className={s.text} style={{alignSelf: 'flex-start'}}>
                            We hope to see you back again!
                        </span>
                    </p>
                    <Button text='Back to My Vault' colored onClick={() => history.replace('/vault/files')} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    expires: state.app.subscription.expires,
});

const connector = connect(mapStateToProps, {...auth});

export default connector(SubCancelledScreen);

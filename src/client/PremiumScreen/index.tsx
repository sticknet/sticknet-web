import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Lottie from 'react-lottie';
import {IoShieldCheckmark, IoSpeedometerOutline} from 'react-icons/io5';
import {LiaStickyNoteSolid} from 'react-icons/lia';
import {MdGroups2} from 'react-icons/md';
import {BiSolidBadgeCheck} from 'react-icons/bi';
import gs from '../../global.css';
import s from './style.css';
import {premiumAnimation} from '../../../assets/lottie';
import {colors} from '../../foundations';
import {iap} from '../../actions';
import {Button, CloudVaultIcon} from '../../components';
import {unixToDate} from '../../utils';
import {IApplicationState} from '../../types';

const data = [
    {
        title: 'Bigger CloudVault space',
        icon: <CloudVaultIcon />,
        basic: '1 GB',
        premium: '2 TB (2000 GB)',
        vault: true,
    },
    {
        title: 'Bigger file uploads',
        icon: <IoSpeedometerOutline size={28} color={colors.black} />,
        basic: '50 MB',
        premium: '50 GB',
    },
    {
        title: 'End-to-end encrypted notes',
        icon: <LiaStickyNoteSolid size={28} color={colors.black} />,
        basic: '50 notes',
        premium: '5000 notes',
    },
    {
        title: 'Higher Group Limit',
        icon: <MdGroups2 size={28} color={colors.black} />,
        basic: '10 members',
        premium: '250 members',
    },
    {
        title: 'Profile Badge',
        icon: <BiSolidBadgeCheck size={28} color={colors.primary} />,
        basic: 'n/a',
        premium: 'Premium badge',
    },
];

type PropsFromRedux = ConnectedProps<typeof connector>;
type PremiumScreenProps = PropsFromRedux;

const PremiumScreen: React.FC<PremiumScreenProps> = (props) => {
    useEffect(() => {
        props.fetchSubscriptionDetails();
    }, []);

    return (
        <div className={gs.main}>
            <div className={`${gs.screenContainer} ${gs.centerScreen}`}>
                <div className={gs.box} style={{padding: '2vw 5vw'}}>
                    <Lottie
                        options={{
                            loop: true,
                            animationData: premiumAnimation,
                        }}
                        height={100}
                        width={100}
                        isStopped={false}
                        isPaused={false}
                    />
                    <p className={s.sticknet}>
                        Sticknet <span className={s.premium}>Premium</span>
                    </p>
                    <div className={s.shieldText} style={{marginTop: 16}}>
                        <IoShieldCheckmark color='#34A853' size={20} style={{marginRight: 8}} />
                        End-to-end encrypted
                    </div>
                    <div className={s.shieldText} style={{marginBottom: 12}}>
                        <IoShieldCheckmark color='#34A853' size={20} style={{marginRight: 8}} />
                        Decentralized storage
                    </div>
                    {props.expiring && (
                        <>
                            <p style={{marginTop: '12px'}}>
                                Current subscription expires on: {unixToDate(props.expires!)}.
                            </p>
                            <p style={{marginTop: '4px'}}>Renew now to keep your premium benefits!</p>
                        </>
                    )}
                    {props.isBasic || props.expiring ? (
                        <>
                            <p style={{fontWeight: 'bold', marginTop: 12}}>USD 8.99 / month</p>
                            {props.expiring ? (
                                <Button text='Proceed to checkout' colored onClick={() => props.checkout()} />
                            ) : (
                                <Button
                                    text='Try free for 30 days&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Proceed to checkout'
                                    colored
                                    onClick={() => props.checkout()}
                                />
                            )}
                        </>
                    ) : null}
                    {data.map((item, index) => (
                        <div className={s.itemContainer} key={index} style={{marginTop: index === 0 ? '28px' : 0}}>
                            <div className={s.titleContainer}>
                                {item.icon}
                                <p style={{fontWeight: 'bold'}}>{item.title}</p>
                            </div>
                            <div className={s.textContainer}>
                                <p className={s.basicText}>Basic: {item.basic}</p>
                                <p className={s.premiumText}>Premium: {item.premium}</p>
                            </div>
                        </div>
                    ))}
                    {!props.isBasic && !props.expiring ? (
                        props.platform === 'web' ? (
                            <button
                                type='button'
                                className={s.cancel}
                                onClick={() => {
                                    if (!props.loading) props.billingPortal();
                                }}>
                                {!props.loading ? 'Manage subscription' : 'Redirecting...'}
                            </button>
                        ) : (
                            <p>Your subscription is billed through {props.platform === 'ios' ? 'Apple' : 'Google'}</p>
                        )
                    ) : null}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    isBasic: !state.auth.user || state.auth.user.subscription === 'basic',
    platform: state.app.subscription.platform,
    expiring: state.auth.user?.subscriptionExpiring,
    expires: state.app.subscription.expires,
    loading: state.progress.loading,
});

const connector = connect(mapStateToProps, {...iap});

export default connector(PremiumScreen);

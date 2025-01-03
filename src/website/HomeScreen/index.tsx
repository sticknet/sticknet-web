import React, {useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import Lottie from 'react-lottie';
import {connect, ConnectedProps} from 'react-redux';
import QRCode from 'react-qr-code';
import s from './HomeScreen.css';
import {installAnimation} from '../../../assets/lottie';

import {DevicesImage, HomeSection} from '../../components';
import {IApplicationState} from '../../types';
import HomeData from './data';

type PropsFromRedux = ConnectedProps<typeof connector>;

type HomeScreenProps = PropsFromRedux;

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
    const history = useHistory();
    useEffect(() => {
        document.title = 'Sticknet';
        window.scrollTo(0, 0);
        if (props.user) history.push('/vault/files');
    }, []);
    const isDesktop = window.innerWidth > window.innerHeight;
    if (isDesktop)
        return (
            <div className={s.homeBody} style={{padding: 0}}>
                <div
                    className={s.sectionContainer}
                    style={{
                        backgroundColor: '#000',
                        padding: '5vw',
                        height: '60vh',
                    }}>
                    <div className={`${s.section} ${s.headerSection}`}>
                        <div style={{marginTop: '15vh'}}>
                            <p className={s.title}>Web3 Social Storage</p>
                            <p className={`${s.subtitle}`}>
                                Sticknet isn't just secure and private, but also rich and powerful!
                            </p>
                            <div className={s.storeContainer}>
                                <a
                                    target='_blank'
                                    href='https://apps.apple.com/app/sticknet-encrypted-platform/id1576169188'
                                    rel='noreferrer'>
                                    <img
                                        src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/app-store.svg?alt=media&token=b6a7ec90-2fe1-49ed-b402-d908eca2d8f2'
                                        className={s.store}
                                        alt='Download on the App Store'
                                    />
                                </a>
                                <a
                                    target='_blank'
                                    href='https://play.google.com/store/apps/details?id=com.stiiick'
                                    style={{marginLeft: '5vw'}}
                                    rel='noreferrer'>
                                    <img
                                        src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/google-play.svg?alt=media&token=8a8cc265-190a-4eec-a290-0ca6f1f1bd10'
                                        className={s.store}
                                        alt='Get it on Google Play'
                                    />
                                </a>
                            </div>
                        </div>
                        <DevicesImage />
                    </div>
                </div>

                {HomeData.map((item, index) => (
                    <HomeSection key={index} index={index} {...item} />
                ))}

                <div
                    id='get-sticknet'
                    className={s.sectionContainer}
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '80vh',
                        paddingTop: '5vw',
                    }}>
                    <p className={s.heading}>
                        Get <span style={{fontFamily: 'Sirin Stencil'}}>Sticknet</span> now
                    </p>
                    <img
                        src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/sticknet-icon.png?alt=media&token=2b665dae-a63d-4884-a92e-59d5899530dc'
                        className={s.icon}
                        alt='Sticknet Icon'
                    />
                    <div style={{marginTop: 40, marginBottom: 40}}>
                        <QRCode value={`${window.location.origin}/qr-redirect`} />
                    </div>
                    <div className={s.storeContainer} style={{marginTop: '0'}}>
                        <a
                            target='_blank'
                            href='https://apps.apple.com/app/sticknet-encrypted-platform/id1576169188'
                            rel='noreferrer'>
                            <img
                                src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/appstore-min.jpg?alt=media&token=210d2cbe-7481-464e-a37a-068ecec40584'
                                className={s.store}
                                alt='Download on the App Store'
                            />
                        </a>
                        <a
                            target='_blank'
                            href='https://play.google.com/store/apps/details?id=com.stiiick'
                            style={{marginLeft: '5vw'}}
                            rel='noreferrer'>
                            <img
                                src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/google-play.svg?alt=media&token=8a8cc265-190a-4eec-a290-0ca6f1f1bd10'
                                className={s.store}
                                alt='Get it on Google Play'
                            />
                        </a>
                    </div>
                    <p className={s.heading} style={{marginTop: '5vh'}}>
                        Own your privacy.
                    </p>
                    <div style={{marginTop: '10vh'}}>
                        <p className={s.heading} style={{fontSize: '1.2vw'}}>
                            Have any questions? Check out our{' '}
                            <Link className={s.link} to='/faq'>
                                FAQ
                            </Link>{' '}
                            or{' '}
                            <Link className={s.link} to='/support'>
                                contact us
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        );
    return (
        <div className={s.homeBody} style={{padding: 0}}>
            <div
                className={s.sectionContainer}
                style={{
                    backgroundColor: '#000',
                    padding: '5vw',
                    height: '80vh',
                }}>
                <div className={s.section} style={{paddingTop: '15vh'}}>
                    <p className={s.title}>Web3 Social Storage.</p>
                    <p className={`${s.description} ${s.subDescription}`}>
                        Sticknet isn't just secure and private, but also rich and powerful!
                    </p>
                    <div className={s.storeContainer}>
                        <a
                            target='_blank'
                            href='https://apps.apple.com/app/sticknet-encrypted-platform/id1576169188'
                            rel='noreferrer'>
                            <img
                                src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/app-store.svg?alt=media&token=b6a7ec90-2fe1-49ed-b402-d908eca2d8f2'
                                className={s.store}
                                alt='Download on the App Store'
                            />
                        </a>
                        <a
                            target='_blank'
                            href='https://play.google.com/store/apps/details?id=com.stiiick'
                            style={{marginLeft: '5vw'}}
                            rel='noreferrer'>
                            <img
                                src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/google-play.svg?alt=media&token=8a8cc265-190a-4eec-a290-0ca6f1f1bd10'
                                className={s.store}
                                alt='Get it on Google Play'
                            />
                        </a>
                    </div>
                    <DevicesImage />
                </div>
            </div>

            {HomeData.map((item, index) => (
                <HomeSection key={index} index={index} {...item} />
            ))}

            <div
                id='get-sticknet'
                className={s.sectionContainer}
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '80vh',
                }}>
                <p className={s.heading}>
                    Get <span style={{fontFamily: 'Sirin Stencil'}}>Sticknet</span> now
                </p>
                <img
                    src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/sticknet-icon.png?alt=media&token=2b665dae-a63d-4884-a92e-59d5899530dc'
                    className={s.icon}
                    alt='Sticknet Icon'
                />
                <Lottie
                    options={{loop: true, animationData: installAnimation}}
                    height={400}
                    width={400}
                    isStopped={false}
                    isPaused={false}
                />
                <div className={s.storeContainer} style={{marginTop: '0'}}>
                    <a
                        target='_blank'
                        href='https://apps.apple.com/app/sticknet-encrypted-platform/id1576169188'
                        rel='noreferrer'>
                        <img
                            src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/appstore-min.jpg?alt=media&token=210d2cbe-7481-464e-a37a-068ecec40584'
                            className={s.store}
                            alt='Download on the App Store'
                        />
                    </a>
                    <a
                        target='_blank'
                        href='https://play.google.com/store/apps/details?id=com.stiiick'
                        style={{marginLeft: '5vw'}}
                        rel='noreferrer'>
                        <img
                            src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/google-play.svg?alt=media&token=8a8cc265-190a-4eec-a290-0ca6f1f1bd10'
                            className={s.store}
                            alt='Get it on Google Play'
                        />
                    </a>
                </div>
                <p className={s.heading} style={{marginTop: '5vh'}}>
                    Own your privacy.
                </p>
                <div style={{marginTop: '8vh', marginLeft: '5vw'}}>
                    <p className={s.heading} style={{fontSize: '4.5vw', width: '90vw'}}>
                        Have any questions? Check out our{' '}
                        <Link className={s.link} to='/faq'>
                            FAQ
                        </Link>{' '}
                        or{' '}
                        <Link className={s.link} to='/support'>
                            contact us
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    user: state.auth.user,
});

const connector = connect(mapStateToProps);

export default connect(mapStateToProps, null)(HomeScreen);

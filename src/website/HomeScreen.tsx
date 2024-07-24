import React, {useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import Lottie from 'react-lottie';
import {connect, ConnectedProps} from 'react-redux';
import QRCode from 'react-qr-code';
import {FaStar} from 'react-icons/fa';
import s from './css/HomeScreen.css';
import {
    securityAnimation,
    speedAnimation,
    adsAnimation,
    verifiedAnimation,
    installAnimation,
    decentralizedAnimation,
    socialAnimation,
} from '../../assets/lottie';

import {DevicesImage, SyncAnimation, Table, TableChats} from '../components';
import {IApplicationState} from '../types';

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
                            <p className={s.title}>Own your privacy.</p>
                            <p className={s.description}>Secure Social Storage Platform.</p>
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
                        </div>
                        <DevicesImage />
                    </div>
                </div>
                <div className={s.sectionContainer}>
                    <div className={s.section}>
                        <div style={{flex: 0.5}}>
                            <Lottie
                                options={{
                                    loop: true,
                                    animationData: securityAnimation,
                                }}
                                height={300}
                                width={300}
                                isStopped={false}
                                isPaused={false}
                            />
                        </div>
                        <div style={{flex: 0.5, paddingTop: '5vh'}}>
                            <p className={s.heading}>End-to-End Encrypted</p>
                            <p className={`${s.description} ${s.description2}`}>
                                Elevate your data security with our end-to-end encrypted file storage, providing a
                                fortress of privacy for your sensitive information. Enjoy seamless file access and
                                sharing through your very own Vault, while ensuring that your data remains confidential
                                and protected.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={s.sectionContainer} style={{background: '#000'}}>
                    <div className={s.section}>
                        <div style={{flex: 0.5, paddingTop: '5vh'}}>
                            <p className={s.heading} style={{color: '#fff'}}>
                                Decentralized Storage
                            </p>
                            <p className={`${s.description} ${s.description2}`} style={{color: '#fff'}}>
                                Decentralized file storage revolutionizes data management by distributing files across a
                                network of nodes, eliminating reliance on a central server. This enhances security,
                                ensures data integrity, and promotes a more resilient and efficient storage
                                infrastructure, empowering users with greater control over their digital assets.
                            </p>
                        </div>
                        <div style={{flex: 0.5}}>
                            <Lottie
                                options={{
                                    loop: true,
                                    animationData: decentralizedAnimation,
                                }}
                                height={300}
                                width={300}
                                isStopped={false}
                                isPaused={false}
                            />
                        </div>
                    </div>
                </div>

                <div className={s.sectionContainer}>
                    <div className={s.section}>
                        <div style={{flex: 0.5}}>
                            <Lottie
                                options={{
                                    loop: true,
                                    animationData: socialAnimation,
                                }}
                                height={300}
                                width={300}
                                isStopped={false}
                                isPaused={false}
                            />
                        </div>
                        <div style={{flex: 0.5, paddingTop: '5vh'}}>
                            <p className={s.heading}>Integrated Groups and Messenger</p>
                            <p className={`${s.description} ${s.description2}`}>
                                Elevate your file management experience with a perfect blend of productivity and social
                                connectivity. Every post, photo, video, comment, reaction, message, notification,
                                profile, group and more on <span style={{fontFamily: 'Sirin Stencil'}}>Sticknet</span>{' '}
                                is end-to-end encrypted – powered by the open-source and peer-reviewed{' '}
                                <Link to='/stick-protocol' className={s.link}>
                                    Stick Protocol™
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>

                <div className={s.sectionContainer} style={{background: '#000'}}>
                    <div className={s.section}>
                        <div style={{flex: 0.5, paddingTop: '5vh'}}>
                            <p className={s.heading} style={{color: '#fff'}}>
                                Fully Synchronized
                            </p>
                            <p className={`${s.description} ${s.description2}`} style={{color: '#fff'}}>
                                Take no compromise on your privacy: other end-to-end encrypted apps don't synchronize
                                your data across your devices, while the apps that does synchronize your data are not
                                end-to-end encrypted. Sticknet gives you the best of both worlds &#8211; have every post
                                synchronize across your devices end-to-end encrypted.
                            </p>
                        </div>
                        <div style={{flex: 0.5}}>
                            <SyncAnimation />
                        </div>
                    </div>
                </div>

                <div className={s.sectionContainer}>
                    <div className={s.section}>
                        <div style={{flex: 0.5}}>
                            <Lottie
                                options={{
                                    loop: true,
                                    animationData: speedAnimation,
                                }}
                                height={300}
                                width={300}
                                isStopped={false}
                                isPaused={false}
                            />
                        </div>
                        <div style={{flex: 0.5, paddingTop: '5vh'}}>
                            <p className={s.heading}>Highly Secure, Highly Performant</p>
                            <p className={`${s.description} ${s.description2}`}>
                                Sticknet offers very high security standards while not affecting the application's
                                usability or performance. All data shared on Sticknet is end-to-end encrypted with
                                almost no performance overhead.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={s.sectionContainer} style={{background: '#000'}}>
                    <div className={s.section}>
                        <div style={{flex: 0.5, paddingTop: '5vh'}}>
                            <p className={s.heading} style={{color: '#fff'}}>
                                No Ads, No Trackers
                            </p>
                            <p className={`${s.description} ${s.description2}`} style={{color: '#fff'}}>
                                Sticknet is built for you, not your data. Enjoy sharing the moment without ads
                                interruption, or being worried about getting tracked.
                            </p>
                        </div>
                        <div style={{flex: 0.5, transform: 'translate(0, -15vh)'}}>
                            <Lottie
                                options={{
                                    loop: true,
                                    animationData: adsAnimation,
                                }}
                                height={400}
                                width={400}
                                isStopped={false}
                                isPaused={false}
                            />
                        </div>
                    </div>
                </div>

                <div className={s.sectionContainer}>
                    <div className={s.section}>
                        <div style={{flex: 0.5}}>
                            <TableChats />
                        </div>
                        <div style={{flex: 0.5}}>
                            <p className={s.heading} style={{fontSize: '2.25vw'}}>
                                Preserve your memories securely
                            </p>
                            <p className={`${s.description} ${s.description2}`}>
                                Sticknet chats is the best way to preserve your memories. Sticknet chats organizes your
                                photos into timeless albums. By sharing your memories through Sticknet chats they will
                                be end-to-end encrypted, decentralized and can be accessible from multiple mobile
                                devices. The chat history is persistent, meaning you never have to worry about backups.
                                All of your memories are preserved in full resolution.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={s.sectionContainer} style={{paddingTop: 0}}>
                    <div className={s.section}>
                        <div style={{flex: 0.5}}>
                            <p className={s.heading}>Ahead of the Competition</p>
                            <p className={`${s.description} ${s.description2}`}>
                                Sticknet offers what no other cloud storage has. Unmatched confidentiality with our
                                end-to-end encryption. Next level security and sustainability with decentralized
                                storage. Integrated social features, like creating groups, adding connections, and a
                                private messenger. All while providing a better price.
                            </p>
                        </div>
                        <div style={{flex: 0.5}}>
                            <Table />
                        </div>
                    </div>
                </div>

                <div className={s.sectionContainer} style={{background: '#000', height: '10vh'}}>
                    <div className={s.section}>
                        <div style={{flex: 0.5}}>
                            <Lottie
                                options={{
                                    loop: true,
                                    animationData: verifiedAnimation,
                                }}
                                height={300}
                                width={300}
                                isStopped={false}
                                isPaused={false}
                            />
                        </div>
                        <div style={{flex: 0.5, paddingTop: '5vh'}}>
                            <p className={s.heading} style={{color: '#fff'}}>
                                Verified Architecture
                            </p>
                            <p className={`${s.description} ${s.description2}`} style={{color: '#fff'}}>
                                Sticknet's security features are provided by the open-source and peer-reviewed{' '}
                                <Link to='/stick-protocol' className={s.link2}>
                                    Stick Protocol
                                </Link>
                                . The Stick Protocol paper is published in IEEE TDSC &#8211; one of the highest
                                impact-factor security journals in the world.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={s.sectionContainer} style={{background: '#000', height: '20vh'}}>
                    <div className={s.section}>
                        <div style={{flex: 0.5}}>
                            <p className={s.heading} style={{color: '#fff'}}>
                                Open Source
                            </p>
                            <p className={`${s.description} ${s.description2}`} style={{color: '#fff'}}>
                                Sticknet is a fully open-source project. All of Sticknet's repositories including the{' '}
                                <a
                                    target='_blank'
                                    href='https://github.com/sticknet/sticknet-mobile'
                                    rel='noreferrer'
                                    className={s.link2}>
                                    mobile apps
                                </a>
                                , the web app, the server, and the Stick protocol are open-source.
                            </p>
                        </div>
                        <div style={{flex: 0.5, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <FaStar color='#EAC54F' style={{width: 200, height: 200}} />
                        </div>
                    </div>
                </div>

                <div
                    id='get-sticknet'
                    className={s.sectionContainer}
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '70vh',
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
                    <p className={s.title}>Own your privacy.</p>
                    <p className={s.description} style={{width: '100%'}}>
                        Secure Social Storage Platform.
                    </p>
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

            <div className={s.sectionContainer} style={{height: '100vh'}}>
                <div className={s.section} style={{marginTop: '30vh'}}>
                    <p className={s.heading}>End-to-End Encrypted</p>
                    <p className={`${s.description} ${s.description2}`}>
                        Elevate your data security with our end-to-end encrypted file storage, providing a fortress of
                        privacy for your sensitive information. Enjoy seamless file access and sharing through your very
                        own Vault, while ensuring that your data remains confidential and protected.
                    </p>
                    <Lottie
                        options={{
                            loop: true,
                            animationData: securityAnimation,
                        }}
                        height={300}
                        width={300}
                        isStopped={false}
                        isPaused={false}
                    />
                </div>
            </div>

            <div className={s.sectionContainer} style={{background: '#000'}}>
                <div className={s.section}>
                    <p className={s.heading} style={{color: '#fff'}}>
                        Decentralized Storage
                    </p>
                    <p className={`${s.description} ${s.description2}`} style={{color: '#fff'}}>
                        Decentralized file storage revolutionizes data management by distributing files across a network
                        of nodes, eliminating reliance on a central server. This enhances security, ensures data
                        integrity, and promotes a more resilient and efficient storage infrastructure, empowering users
                        with greater control over their digital assets.
                    </p>
                    <Lottie
                        options={{loop: true, animationData: decentralizedAnimation}}
                        height={300}
                        width={300}
                        isStopped={false}
                        isPaused={false}
                    />
                </div>
            </div>

            <div className={s.sectionContainer}>
                <div className={s.section}>
                    <p className={s.heading}>Integrated Groups and Messenger</p>
                    <p className={`${s.description} ${s.description2}`}>
                        Elevate your file management experience with a perfect blend of productivity and social
                        connectivity. Every post, photo, video, comment, reaction, message, notification, profile, group
                        and more on <span style={{fontFamily: 'Sirin Stencil'}}>Sticknet</span> is end-to-end encrypted
                        – powered by the open-source and peer-reviewed{' '}
                        <Link to='/stick-protocol' className={s.link}>
                            Stick Protocol™
                        </Link>
                        .
                    </p>
                    <Lottie
                        options={{loop: true, animationData: socialAnimation}}
                        height={300}
                        width={300}
                        isStopped={false}
                        isPaused={false}
                    />
                </div>
            </div>

            <div className={s.sectionContainer} style={{background: '#000'}}>
                <div className={s.section}>
                    <p className={s.heading} style={{color: '#fff'}}>
                        Fully Synchronized
                    </p>
                    <p className={`${s.description} ${s.description2}`} style={{color: '#fff'}}>
                        Take no compromise on your privacy: other end-to-end encrypted apps don't synchronize your data
                        across your devices, while the apps that does synchronize your data are not end-to-end
                        encrypted. Sticknet gives you the best of both worlds &#8211; have every post synchronize across
                        your devices end-to-end encrypted.
                    </p>
                    <SyncAnimation />
                </div>
            </div>

            <div className={s.sectionContainer}>
                <div className={s.section}>
                    <p className={s.heading}>Highly Secure, Highly Performant</p>
                    <p className={`${s.description} ${s.description2}`}>
                        Sticknet offers very high security standards while not affecting the application's usability or
                        performance. All data shared on Sticknet is end-to-end encrypted with almost no performance
                        overhead.
                    </p>
                    <Lottie
                        options={{loop: true, animationData: speedAnimation}}
                        height={300}
                        width={300}
                        isStopped={false}
                        isPaused={false}
                    />
                </div>
            </div>

            <div className={s.sectionContainer} style={{background: '#000'}}>
                <div className={s.section}>
                    <p className={s.heading} style={{color: '#fff'}}>
                        No Ads, No Trackers
                    </p>
                    <p className={`${s.description} ${s.description2}`} style={{color: '#fff'}}>
                        Sticknet is built for you, not your data. Enjoy sharing the moment without ads interruption, or
                        being worried about getting tracked.
                    </p>
                    <Lottie
                        options={{loop: true, animationData: adsAnimation}}
                        height={400}
                        width={400}
                        isStopped={false}
                        isPaused={false}
                        // @ts-ignore
                        style={{transform: 'translate(-5vw, 0)'}}
                    />
                </div>
            </div>

            <div className={s.sectionContainer} style={{height: '900px', paddingBottom: 0}}>
                <div className={s.section} style={{width: '100%', marginLeft: 0}}>
                    <p className={s.heading} style={{marginLeft: '5vw', marginRight: '5vw'}}>
                        Preserve your memories securely
                    </p>
                    <p
                        className={`${s.description} ${s.description2}`}
                        style={{marginBottom: '5vh', marginLeft: '5vw', marginRight: '5vw'}}>
                        Sticknet chats is the best way to preserve your memories. Sticknet chats organizes your photos
                        into timeless albums. By sharing your memories through Sticknet chats they will be end-to-end
                        encrypted, decentralized and can be accessible from multiple mobile devices. The chat history is
                        persistent, meaning you never have to worry about backups. All of your memories are preserved in
                        full resolution.
                    </p>
                    <div className={s.tableContainer}>
                        <div className={s.tableWrapper}>
                            <TableChats />
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.sectionContainer} style={{height: '100vh', paddingTop: 0}}>
                <div className={s.section} style={{width: '100%', marginLeft: 0}}>
                    <p className={s.heading} style={{marginLeft: '5vw', marginRight: '5vw'}}>
                        Ahead of the Competition
                    </p>
                    <p
                        className={`${s.description} ${s.description2}`}
                        style={{marginBottom: '5vh', marginLeft: '5vw', marginRight: '5vw'}}>
                        Sticknet offers what no other cloud storage has. Unmatched confidentiality with our end-to-end
                        encryption. Next level security and sustainability with decentralized storage. Integrated social
                        features, like sharing posts, creating groups, adding connections, and a private messenger. All
                        while providing a better price.
                    </p>
                    <div className={s.tableContainer}>
                        <div className={s.tableWrapper}>
                            <Table />
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.sectionContainer} style={{background: '#000', height: '60vh'}}>
                <div className={s.section}>
                    <p className={s.heading} style={{color: '#fff'}}>
                        Verified Architecture
                    </p>
                    <p className={`${s.description} ${s.description2}`} style={{color: '#fff'}}>
                        Sticknet's security features are provided by the open-source and peer-reviewed{' '}
                        <Link to='/stick-protocol' className={s.link2}>
                            Stick Protocol
                        </Link>
                        . The Stick Protocol paper is published in IEEE TDSC &#8211; one of the highest impact-factor
                        security journals in the world.
                    </p>
                    <Lottie
                        options={{
                            loop: true,
                            animationData: verifiedAnimation,
                        }}
                        height={300}
                        width={300}
                        isStopped={false}
                        isPaused={false}
                    />
                </div>
            </div>

            <div className={s.sectionContainer} style={{background: '#000', height: '55vh', paddingTop: '0vw'}}>
                <div className={s.section}>
                    <p className={s.heading} style={{color: '#fff'}}>
                        Open Source
                    </p>
                    <p className={`${s.description} ${s.description2}`} style={{color: '#fff'}}>
                        Sticknet is a fully open-source project. All of Sticknet's repositories including the{' '}
                        <a
                            target='_blank'
                            href='https://github.com/sticknet/sticknet-mobile'
                            rel='noreferrer'
                            className={s.link2}>
                            mobile apps
                        </a>
                        , the web app, the server, and the Stick protocol are open-source.
                    </p>
                    <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: 40}}>
                        <FaStar color='#EAC54F' style={{width: 150, height: 150}} />
                    </div>
                </div>
            </div>

            <div
                id='get-sticknet'
                className={s.sectionContainer}
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '70vh',
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

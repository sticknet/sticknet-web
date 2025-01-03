import {Link} from 'react-router-dom';
import {FaStar} from 'react-icons/fa';
import React from 'react';
import {
    adsAnimation,
    decentralizedAnimation,
    ethereumAnimation,
    securityAnimation,
    socialAnimation,
    speedAnimation,
    verifiedAnimation,
} from '../../../assets/lottie';
import s from './HomeScreen.css';
import {SyncAnimation, Table, TableChats} from '../../components';

const isMobile = window.innerHeight > window.innerWidth;

const HomeData = [
    {
        title: 'End-to-End Encrypted',
        description: (
            <>
                Elevate your data security with our end-to-end encrypted file storage, providing a fortress of privacy
                for your sensitive information. Enjoy seamless file access and sharing through your very own Vault,
                while ensuring that your data remains confidential and protected.
            </>
        ),
        animationData: securityAnimation,
        containerStyle: isMobile ? {height: '90vh'} : {},
        infoContainerStyle: isMobile ? {marginTop: '20vh'} : {},
    },
    {
        title: 'Decentralized Storage',
        description: (
            <>
                Decentralized file storage revolutionizes data management by distributing files across a network of
                nodes, eliminating reliance on a central server. This enhances security, ensures data integrity, and
                promotes a more resilient and efficient storage infrastructure, empowering users with greater control
                over their digital assets.
            </>
        ),
        animationData: decentralizedAnimation,
    },
    {
        title: 'Passwordless Wallet Login',
        description: (
            <>
                Sign in with your Ethereum wallet, without having to remember an email or a password. A more secure and
                frictionless way to access your account.
            </>
        ),
        animationData: ethereumAnimation,
    },
    {
        title: 'Fully Synchronized',
        description: (
            <>
                Take no compromise on your privacy: other end-to-end encrypted apps don't synchronize your data across
                your devices, while the apps that does synchronize your data are not end-to-end encrypted. Sticknet
                gives you the best of both worlds &#8211; have every post synchronize across your devices end-to-end
                encrypted.
            </>
        ),
        animationComponent: <SyncAnimation />,
    },
    {
        title: 'Integrated Groups and Messenger',
        description: (
            <>
                Elevate your file management experience with a perfect blend of productivity and social connectivity.
                Every post, photo, video, comment, reaction, message, notification, profile, group and more on{' '}
                <span style={{fontFamily: 'Sirin Stencil'}}>Sticknet</span> is end-to-end encrypted – powered by the
                open-source and peer-reviewed{' '}
                <Link to='/stick-protocol' className={s.link}>
                    Stick Protocol™
                </Link>
                .
            </>
        ),
        animationData: socialAnimation,
    },
    {
        title: 'No Ads, No Trackers',
        description: (
            <>
                Sticknet is built for you, not your data. Enjoy sharing the moment without ads interruption, or being
                worried about getting tracked.
            </>
        ),
        animationData: adsAnimation,
        animationContainerStyle: {transform: isMobile ? 'translate(-5vw, 0)' : 'translate(0, -15vh)'},
        animationStyle: {width: 400, height: 400},
    },
    {
        title: 'Highly Secure, Highly Performant',
        description: (
            <>
                Sticknet offers very high security standards while not affecting the application's usability or
                performance. All data shared on Sticknet is end-to-end encrypted with almost no performance overhead.
            </>
        ),
        animationData: speedAnimation,
    },
    {
        title: 'Verified Architecture',
        description: (
            <>
                Sticknet's security features are provided by the open-source and peer-reviewed{' '}
                <Link to='/stick-protocol' className={s.link2}>
                    Stick Protocol
                </Link>
                . The Stick Protocol paper is published in IEEE TDSC &#8211; one of the highest impact-factor security
                journals in the world.
            </>
        ),
        animationData: verifiedAnimation,
        // containerStyle: isMobile ? {height: '60vh'} : {height: '10vh'},
    },
    {
        title: 'Preserve your memories securely',
        description: (
            <>
                Sticknet chats is the best way to preserve your memories. Sticknet chats organizes your photos into
                timeless albums. By sharing your memories through Sticknet chats they will be end-to-end encrypted,
                decentralized and can be accessible from multiple mobile devices. The chat history is persistent,
                meaning you never have to worry about backups. All of your memories are preserved in full resolution.
            </>
        ),
        animationComponent: isMobile ? (
            <div className={s.tableContainer}>
                <TableChats />
            </div>
        ) : (
            <TableChats />
        ),
        titleStyle: isMobile ? {} : {fontSize: '2.25vw'},
        infoContainerStyle: isMobile ? {width: '100%', marginLeft: 0} : {paddingTop: 0},
        containerStyle: isMobile ? {height: '900px', paddingBottom: 0} : {},
    },
    {
        title: 'Ahead of the competition',
        description: (
            <>
                Sticknet offers what no other cloud storage has. Unmatched confidentiality with our end-to-end
                encryption. Next level security and sustainability with decentralized storage. Integrated social
                features, like creating groups, adding connections, and a private messenger. All while providing a
                better price.
            </>
        ),
        animationComponent: isMobile ? (
            <div className={s.tableContainer}>
                <Table />
            </div>
        ) : (
            <Table />
        ),
        theme: 'light',
        infoContainerStyle: isMobile ? {width: '100%', marginLeft: 0} : {paddingTop: 0},
        containerStyle: isMobile ? {height: '100vh', paddingTop: 0} : {paddingTop: 0},
    },
    {
        title: 'Open Source',
        description: (
            <>
                Sticknet is a fully open-source project. All of Sticknet's repositories including the{' '}
                <a
                    target='_blank'
                    href='https://github.com/sticknet/sticknet-mobile'
                    rel='noreferrer'
                    className={s.link2}>
                    mobile apps
                </a>
                , the web app, the server, and the Stick protocol are open-source.
            </>
        ),
        animationComponent: <FaStar color='#EAC54F' style={{width: 200, height: 200}} />,
        theme: 'dark',
        // containerStyle: isMobile ? {height: '60vh', paddingTop: '0vw'} : {height: '20vh'},
        animationContainerStyle: isMobile
            ? {justifyContent: 'center', display: 'flex'}
            : {justifyContent: 'center', display: 'flex'},
    },
];

export default HomeData;

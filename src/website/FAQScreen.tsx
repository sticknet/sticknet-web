import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import s from './css/StickProtocolScreen.css';
import gs from '../global.css';

class FAQScreen extends Component {
    componentDidMount() {
        document.title = 'Sticknet | FAQ';
        window.scrollTo(0, 0);
    }

    render() {
        const isDesktop = window.innerWidth > window.innerHeight;
        return (
            <div className={gs.main}>
                <div className={gs.screenContainer} style={{paddingTop: isDesktop ? '15vh' : '13vh'}}>
                    <h1 className={s.title} style={{paddingTop: 0}}>
                        FAQ
                    </h1>
                    <ul
                        style={{
                            paddingTop: '2vh',
                            paddingLeft: isDesktop ? '1vw' : '5vw',
                        }}>
                        <li className={s.li}>
                            <a href='#General-Questions' className={s.link}>
                                General Questions
                            </a>
                        </li>
                        <ul style={{paddingLeft: isDesktop ? '1vw' : '5vw'}}>
                            <li className={s.li}>
                                <a href='#a1' className={s.link}>
                                    What is Sticknet?
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#a3' className={s.link}>
                                    How can Sticknet sync the content across different devices while being end-to-end
                                    encrypted, and persist the encrypted content across logins?
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#a4' className={s.link}>
                                    What decentralized storage solution does Sticknet use?
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#a6' className={s.link}>
                                    What about GDPR?
                                </a>
                            </li>
                        </ul>
                        <li className={s.li}>
                            <a href='#Using-Sticknet' className={s.link}>
                                Using Sticknet
                            </a>
                        </li>
                        <ul style={{paddingLeft: isDesktop ? '1vw' : '5vw'}}>
                            <li className={s.li}>
                                <a href='#b0' className={s.link}>
                                    What is 'My Vault'?
                                </a>
                            </li>
                        </ul>
                    </ul>
                    <hr className={s.hLine} />
                    <h2 className={s.h2} id='General-Questions'>
                        General Questions
                    </h2>
                    <h3 className={s.q} id='a1'>
                        What is Sticknet?
                    </h3>
                    <p className={s.ans}>
                        Sticknet is an end-to-end encrypted & decentralized cloud storage - the first of its kind.
                        Unlike other cloud storages, any data you upload on Sticknet is end-to-end encrypted. This means
                        that no one else can access your data - including us and third parties. Sticknet also has an
                        integrated social network - which is also fully end-to-end encrypted.
                    </p>

                    <h3 className={s.q} id='a3'>
                        How can Sticknet sync the content across different devices while being end-to-end encrypted, and
                        persist the encrypted content across logins?
                    </h3>
                    <p className={s.ans}>
                        To achieve this, Sticknet uses a custom end-to-end encryption protocol specifically designed for
                        persistent cloud storage -{' '}
                        <Link to='/stick-protocol' className={s.link}>
                            Stick Protocol
                        </Link>
                        .
                    </p>

                    <h3 className={s.q} id='a4'>
                        What decentralized storage solution does Sticknet use?
                    </h3>
                    <p className={s.ans}>
                        Every single file uploaded on Sticknet is stored in a decentralized storage. Sticknet leverages
                        the decentralized storage network from{' '}
                        <a className={s.link} href='https://www.storj.io/' target='_blank' rel='noreferrer'>
                            Storj
                        </a>
                        .
                    </p>

                    <h3 className={s.q} id='a6'>
                        What about GDPR?
                    </h3>
                    <p className={s.ans}>
                        Sticknet is specifically designed to protect user privacy and uses only the minimum information
                        needed to deliver our service.
                    </p>

                    <hr className={s.hLine} />
                    <h2 className={s.h2} id='Using-Sticknet'>
                        Using Sticknet
                    </h2>
                    <h3 className={s.q} id='b0'>
                        What is 'My Vault'?
                    </h3>
                    <p className={s.ans}>
                        'My Vault' is your very own secure and private cloud storage. It is end-to-end encrypted and
                        decentralized. You can access your Vault from your mobile devices or from your computer on
                        www.sticknet.org. You can securely store files, photos, notes and more inside your Vault.
                    </p>

                    <hr className={s.hLine} />
                    <p className={s.p}>
                        Did not find an answer for{' '}
                        <Link to='/support' className={s.link}>
                            your question
                        </Link>
                        ?
                    </p>
                </div>
            </div>
        );
    }
}

export default FAQScreen;

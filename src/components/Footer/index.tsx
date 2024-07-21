import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

import s from './Footer.css';

class Footer extends PureComponent {
    render() {
        if (window.innerWidth > window.innerHeight)
            // Desktop
            return (
                <div className={s.footer} id='footer'>
                    <div className={s.footerContainer}>
                        <div>
                            <p className={s.footerText}>© 2018-2024 Sticknet. All rights reserved.</p>
                            <p className={s.footerText} style={{paddingTop: '2vh'}}>
                                For inquiries: contact@sticknet.org
                            </p>
                        </div>
                        <div className={s.footerItems}>
                            <div>
                                <p className={s.footerTitle}>Company</p>
                                <Link to='/legal' className={s.link}>
                                    Terms of Service
                                </Link>
                                <Link to='/legal' className={s.link}>
                                    Privacy Policy
                                </Link>
                            </div>
                            <div>
                                <p className={s.footerTitle}>Download</p>
                                <a
                                    target='_blank'
                                    href='https://apps.apple.com/app/sticknet-encrypted-platform/id1576169188'
                                    className={s.link}
                                    rel='noreferrer'>
                                    iPhone
                                </a>
                                <a
                                    target='_blank'
                                    href='https://play.google.com/store/apps/details?id=com.stiiick'
                                    className={s.link}
                                    rel='noreferrer'>
                                    Android
                                </a>
                            </div>
                            <div>
                                <p className={s.footerTitle}>Social</p>
                                <a
                                    target='_blank'
                                    href='https://www.linkedin.com/company/sticknet/'
                                    className={s.link}
                                    rel='noreferrer'>
                                    LinkedIn
                                </a>
                            </div>
                            <div>
                                <p className={s.footerTitle}>Help</p>
                                <Link className={s.link} to='/faq'>
                                    FAQ
                                </Link>
                                <Link className={s.link} to='/support'>
                                    Support
                                </Link>
                            </div>
                            <div>
                                <p className={s.footerTitle}>Developers</p>
                                <Link className={s.link} to='/stick-protocol'>
                                    Stick Protocol
                                </Link>
                                <a
                                    target='_blank'
                                    href='https://github.com/sticknet'
                                    className={s.link}
                                    rel='noreferrer'>
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        return (
            <div className={s.mobileFooter} id='footer'>
                <div className={s.footerGroup}>
                    <p className={s.footerTitle}>Company</p>
                    <Link to='/legal' className={s.link}>
                        Terms of Service
                    </Link>
                    <Link to='/legal' className={s.link}>
                        Privacy Policy
                    </Link>
                </div>
                <div className={s.footerGroup}>
                    <p className={s.footerTitle}>Download</p>
                    <a
                        target='_blank'
                        href='https://apps.apple.com/app/sticknet-encrypted-platform/id1576169188'
                        className={s.link}
                        rel='noreferrer'>
                        iPhone
                    </a>
                    <a
                        target='_blank'
                        href='https://play.google.com/store/apps/details?id=com.stiiick'
                        className={s.link}
                        rel='noreferrer'>
                        Android
                    </a>
                </div>
                <div className={s.footerGroup}>
                    <p className={s.footerTitle}>Social</p>
                    <a
                        target='_blank'
                        href='https://www.linkedin.com/company/sticknet/'
                        className={s.link}
                        rel='noreferrer'>
                        LinkedIn
                    </a>
                </div>
                <div className={s.footerGroup}>
                    <p className={s.footerTitle}>Help</p>
                    <Link className={s.link} to='/faq'>
                        FAQ
                    </Link>
                    <Link className={s.link} to='/support'>
                        Support
                    </Link>
                </div>
                <div className={s.footerGroup}>
                    <p className={s.footerTitle}>Developers</p>
                    <Link className={s.link} to='/stick-protocol'>
                        Stick Protocol
                    </Link>
                    <a target='_blank' href='https://github.com/sticknet' className={s.link} rel='noreferrer'>
                        GitHub
                    </a>
                </div>
                <div className={s.footerGroup}>
                    <p className={s.footerText}>© 2018-2024 Sticknet. All rights reserved.</p>
                    <p className={s.footerText} style={{marginTop: '2vh'}}>
                        For inquiries: contact@sticknet.org
                    </p>
                </div>
            </div>
        );
    }
}

export default Footer;

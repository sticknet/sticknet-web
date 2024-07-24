import React, {Component} from 'react';

import s from './css/TermsScreen.css';
import gs from '../global.css';

class TermsScreen extends Component {
    componentDidMount() {
        document.title = 'Sticknet | Terms & Privacy';
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className={gs.main}>
                <div className={gs.screenContainer}>
                    <h1 className={s.headerTitle}>Terms of Use & Privacy Policy</h1>

                    <p className={s.p}>
                        Sticknet a secure social storage platform. When using Sticknet, all uploads, content shared,
                        profiles and groups are protected with end-to-end encryption. Meaning they cannot be accessed by
                        us or other third parties. Our Terms of Use and Privacy Policy are available below.
                    </p>

                    <ul className={s.ul}>
                        <li className={s.li}>
                            <a href='#terms-of-use' className={s.link}>
                                Terms of Use
                            </a>
                        </li>
                        <li className={s.li}>
                            <a href='#privacy-policy' className={s.link}>
                                Privacy Policy
                            </a>
                        </li>
                    </ul>

                    <h2 className={s.h2} id='terms-of-use'>
                        Terms of Use
                    </h2>
                    <p className={s.p}>
                        Sticknet utilizes state-of-the-art security and end-to-end encryption to protect the platform
                        content and keep it private and secure. You agree to our Terms of Use (“Terms”) by installing or
                        using our apps.
                    </p>

                    <h3 className={s.h3}>1. ABOUT OUR SERVICES</h3>
                    <p className={s.p}>
                        <b>Minimum Age.</b> You must be at least 13 years old to use our Services. The minimum age to
                        use our Services without parental approval may be higher in your home country.
                    </p>

                    <p className={s.p}>
                        <b>Account Registration.</b> To create an account you must register for our Services using your
                        email. You agree to receive verification emails to register for our Services.
                    </p>

                    <p className={s.p}>
                        <b>Privacy of user data.</b> Sticknet does not sell, rent or monetize your personal data or
                        content in any way.
                    </p>

                    <p className={s.p}>
                        Please read our{' '}
                        <a className={s.link} href='#privacy-policy'>
                            Privacy Policy
                        </a>{' '}
                        to understand how we safeguard the information you provide when using our Services. For the
                        purpose of operating our Services, you agree to our data practices as described in our Privacy
                        Policy, as well as the transfer of your encrypted information and metadata to our servers.
                    </p>

                    <p className={s.p}>
                        <b>Software.</b> In order to enable new features and enhanced functionality, you consent to
                        downloading and installing updates to our Services.
                    </p>

                    <h3 className={s.h3}>2. USING STICKNET</h3>

                    <p className={s.p}>
                        <b>Our Terms and Policies.</b> You must use our Services according to our Terms and posted
                        policies. If we disable your account for a violation of our Terms, you will not create another
                        account without our permission.
                    </p>

                    <p className={s.p}>
                        <b>Legal and Acceptable Use.</b> You agree to use our Services only for legal, authorized, and
                        acceptable purposes. You will not use (or assist others in using) our Services in ways that: (a)
                        violate or infringe the rights of Sticknet, our users, or others, including privacy, publicity,
                        intellectual property, or other proprietary rights; (b) involve sending illegal or impermissible
                        communications such as bulk sharing or messaging.
                    </p>

                    <p className={s.p}>
                        <b>Harm to Sticknet.</b> You must not (or assist others to) access, use, modify, distribute,
                        transfer, or exploit our Services in unauthorized manners, or in ways that harm Sticknet, our
                        Services, or systems. For example you must not (a) gain or try to gain unauthorized access to
                        our Services or systems; (b) disrupt the integrity or performance of our Services; (c) create
                        accounts for our Services through unauthorized or automated means; (d) collect information about
                        our users in any unauthorized manner; or (e) sell, rent, or charge for our Services.
                    </p>

                    <p className={s.p}>
                        <b>Third-party services.</b> Our Services may allow you to access, use, or interact with
                        third-party websites, apps, content, and other products and services. When you use third-party
                        services, their terms and privacy policies govern your use of those services.
                    </p>

                    <h3 className={s.h3}>3. YOUR RIGHTS AND LICENSE WITH Sticknet</h3>
                    <p className={s.p}>
                        <b>Your Rights.</b> You own the information you submit and share through our Services. You must
                        have the rights to the phone number you use to sign up for your Sticknet account.
                    </p>
                    <p className={s.p}>
                        <b>Sticknet’s Rights.</b> We own all copyrights, trademarks, domains, logos, trade dress, trade
                        secrets, patents, and other intellectual property rights associated with our Services. You may
                        not use our copyrights, trademarks, domains, logos, trade dress, patents, and other intellectual
                        property rights unless you have our written permission. To report copyright, trademark, or other
                        intellectual property infringement, please contact report@sticknet.org.
                    </p>
                    <p className={s.p}>
                        <b>Sticknet’s License to You.</b> Sticknet grants you a limited, revocable, non-exclusive, and
                        non-transferable license to use our Services in accordance with these Terms.
                    </p>

                    <h3 className={s.h3}>4. DISCLAIMERS AND LIMITATIONS</h3>
                    <p className={s.p}>
                        <b>Disclaimers.</b> YOU USE OUR SERVICES AT YOUR OWN RISK AND SUBJECT TO THE FOLLOWING
                        DISCLAIMERS. WE PROVIDE OUR SERVICES ON AN “AS IS” BASIS WITHOUT ANY EXPRESS OR IMPLIED
                        WARRANTIES, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                        PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND FREEDOM FROM COMPUTER VIRUS OR OTHER HARMFUL
                        CODE. Sticknet DOES NOT WARRANT THAT ANY INFORMATION PROVIDED BY US IS ACCURATE, COMPLETE, OR
                        USEFUL, THAT OUR SERVICES WILL BE OPERATIONAL, ERROR-FREE, SECURE, OR SAFE, OR THAT OUR SERVICES
                        WILL FUNCTION WITHOUT DISRUPTIONS, DELAYS, OR IMPERFECTIONS. WE DO NOT CONTROL, AND ARE NOT
                        RESPONSIBLE FOR, CONTROLLING HOW OR WHEN OUR USERS USE OUR SERVICES. WE ARE NOT RESPONSIBLE FOR
                        THE ACTIONS OR INFORMATION (INCLUDING CONTENT) OF OUR USERS OR OTHER THIRD PARTIES.
                    </p>

                    <p className={s.p}>
                        <b>Limitation of liability.</b> TO THE MAXIMUM EXTENT PERMITTED BY LAW, Sticknet SHALL NOT BE
                        LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF
                        PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE,
                        GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO
                        ACCESS OR USE THE SERVICE.
                    </p>

                    <p className={s.p}>
                        <b>Availability of Our Services.</b> Our Services may be interrupted, including for maintenance,
                        upgrades, or network or equipment failures. We may discontinue some or all of our Services,
                        including certain features and the support for certain devices and platforms, at any time.
                    </p>

                    <h3 className={s.h3}>5. UPDATING THESE TERMS</h3>
                    <p className={s.p}>
                        We may update the Terms from time to time. When we update our Terms, we will update the “Last
                        Modified” date associated with the updated Terms. Your continued use of our Services confirms
                        your acceptance of our updated Terms and supersedes any prior Terms. You will comply with all
                        applicable export control and trade sanctions laws. Our Terms cover the entire agreement between
                        you and Sticknet regarding our Services. If you do not agree with our Terms, you should stop
                        using our Services.
                    </p>

                    <hr className={s.hLine} />
                    <h2 className={s.h2} id='privacy-policy'>
                        Privacy Policy
                    </h2>
                    <p className={s.p}>
                        Sticknet utilizes state-of-the-art security and end-to-end encryption to provide an end-to-end
                        encrypted and decentralized cloud storage (“Services”). All profiles, groups and content shared
                        on Sticknet are end-to-end encrypted, meaning they cannot be accessed by us or other third
                        parties.
                    </p>

                    <h3 className={s.h3}>1. INFORMATION YOU PROVIDE</h3>
                    <p className={s.p}>
                        <b>Profile.</b> When creating a Sticknet account you provide an email, name and username. These
                        information is used to provide our services to you and other Sticknet users. You may optionally
                        add other information to your account, such as a profile picture and birth date. This
                        information is end-to-end encrypted.
                    </p>

                    <p className={s.p}>
                        <b>Content.</b> All content on Sticknet are end-to-end encrypted, meaning Sticknet (or third
                        parties) cannot decrypt or access your content. This includes all posts, photos, videos, audio,
                        comments, reactions, in-app notifications and push notifications.
                    </p>

                    <p className={s.p}>
                        <b>Groups.</b> All groups on Sticknet are end-to-end encrypted, meaning Sticknet (or third
                        parties) cannot decrypt or access your groups. This includes display name, status, albums, posts
                        and group links.
                    </p>

                    <p className={s.p}>
                        <b>Messages.</b> Sticknet cannot decrypt or access the content of your messages. Sticknet queues
                        end-to-end encrypted messages on its servers for delivery to devices that are temporarily
                        offline. Your messages history is stored on your own devices. Messages history are not persisted
                        across logins.
                    </p>

                    <p className={s.p}>
                        Additional technical information is stored on our servers, including randomly generated
                        authentication tokens, keys and push tokens. Sticknet limits this additional technical
                        information to the minimum required to operate the Services.
                    </p>

                    <p className={s.p}>
                        <b>Contacts</b>. Sticknet can optionally discover which contacts in your address book are
                        Sticknet users.
                    </p>

                    <p className={s.p}>
                        <b>User Support.</b> If you contact our Support, any personal data you may share with us is kept
                        only for the purposes of researching the issue and contacting you about your case.
                    </p>

                    <p className={s.p}>
                        <b>Managing your information.</b> You have complete control (creating, retrieving, updating and
                        deleting) over your profile information and the content you share.
                    </p>

                    <h3 className={s.h3}>2. INFORMATION WE MAY SHARE</h3>

                    <p className={s.p}>
                        <b>Third Parties.</b> We work with third parties to provide some of our Services. For example,
                        our Third-Party Providers send a verification code to your phone number when you register for
                        our Services. These providers are bound by their Privacy Policies to safeguard that information.
                    </p>

                    <p className={s.p}>Other instances where Sticknet may need to share your data:</p>
                    <ul className={s.ul}>
                        <li className={s.li}>
                            To meet any applicable law, regulation, legal process or enforceable governmental request.
                        </li>
                        <li className={s.li}>
                            To enforce applicable Terms, including investigation of potential violations.
                        </li>
                        <li className={s.li}>
                            To detect, prevent, or otherwise address fraud, security, or technical issues.
                        </li>
                        <li className={s.li}>
                            To protect against harm to the rights, property, or safety of Sticknet, our users, or the
                            public as required or permitted by law.
                        </li>
                    </ul>

                    <h3 className={s.h3}>3. UPDATES</h3>
                    <p className={s.p}>
                        We will update this privacy policy as needed so that it is current, accurate, and as clear as
                        possible. Your continued use of our Services confirms your acceptance of our updated Privacy
                        Policy.
                    </p>

                    <h3 className={s.h3}>4. TERMS</h3>
                    <p className={s.p}>
                        Please also read our{' '}
                        <a className={s.link} href='#terms-of-use'>
                            Terms
                        </a>{' '}
                        which also governs the terms of this Privacy Policy.
                    </p>

                    <h3 className={s.h3}>5. HOW TO CONTACT US</h3>
                    <p className={s.p}>
                        If you have any questions about this Privacy Policy or the Service, you can contact us through
                        the app, or send an email to privacy@sticknet.org.
                    </p>

                    <p className={s.p}>Effective date: July 1, 2021</p>
                    <p className={s.p}>Updated: December 1, 2023</p>
                </div>
            </div>
        );
    }
}

export default TermsScreen;

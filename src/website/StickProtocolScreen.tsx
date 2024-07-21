import React, {Component} from 'react';
import {FaStar} from 'react-icons/fa';

import s from './css/StickProtocolScreen.css';
import gs from '../global.css';

class StickProtocolScreen extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = 'Sticknet | Stick Protocol';
    }

    render() {
        const isDesktop = window.innerWidth > window.innerHeight;

        return (
            <div className={gs.main}>
                <div className={gs.screenContainer}>
                    <img
                        src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/StickProtocol.png?alt=media&token=d4c31888-f3b1-4827-9475-e5fa17051f38'
                        className={s.spImg}
                    />
                    <h1 className={s.title}>Stick Protocol</h1>
                    <p className={s.slogan}>
                        Re-Establishable Group End-to-End Encryption with Post-Compromise Security
                    </p>
                    <p className={s.description}>
                        <FaStar /> The Stick Protocol is{' '}
                        <a
                            className={s.link}
                            href='https://github.com/sticknet/stick-protocol'
                            target='_blank'
                            rel='noreferrer'>
                            open-source
                        </a>{' '}
                        on GitHub, and{' '}
                        <a className={s.link} href='stick-protocol.pdf' target='_blank'>
                            peer-reviewed
                        </a>{' '}
                        published in IEEE.
                    </p>
                    <p className={s.description} style={{paddingTop: '2vh'}}>
                        <b>Note</b>:{' '}
                        <i>
                            Although the Stick Protocol was initially developed with a primary focus on social network
                            platforms, it can be extended to other areas where end-to-end encrypted re-establishable
                            sessions would be useful, such as cloud storages
                        </i>
                        .
                    </p>
                    <h1 className={s.h1} style={{paddingTop: '2vh'}}>
                        Table of Contents
                    </h1>
                    <ul
                        style={{
                            paddingTop: '2vh',
                            paddingLeft: isDesktop ? '1vw' : '5vw',
                        }}>
                        <li className={s.li}>
                            <a href='#motivation' className={s.link}>
                                1. Motivation
                            </a>
                        </li>
                        <li className={s.li}>
                            <a href='#messaging-protocols' className={s.link}>
                                2. Messaging Protocols & Social Networks
                            </a>
                        </li>
                        <li className={s.li}>
                            <a href='#pre-reading' className={s.link}>
                                3. Pre-Reading
                            </a>
                        </li>
                        <ul style={{paddingLeft: isDesktop ? '1vw' : '5vw'}}>
                            <li className={s.li}>
                                <a href='#x3dh' className={s.link}>
                                    3.1. X3DH & Double Ratchet
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#group-messaging' className={s.link}>
                                    3.2. Signal Protocol Group Messaging
                                </a>
                            </li>
                        </ul>
                        <li className={s.li}>
                            <a href='#preliminaries' className={s.link}>
                                4. Preliminaries
                            </a>
                        </li>
                        <ul style={{paddingLeft: isDesktop ? '1vw' : '5vw'}}>
                            <li className={s.li}>
                                <a href='#use-case' className={s.link}>
                                    4.1. Use Case Description
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#user-keys' className={s.link}>
                                    4.2. User-Specific Key Types
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#session-keys' className={s.link}>
                                    4.3. Session Key Types
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#other-keys' className={s.link}>
                                    4.4. Other Key Types
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#other-terms' className={s.link}>
                                    4.5. Other Terms
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#state-reset' className={s.link}>
                                    4.5. STATE RESET
                                </a>
                            </li>
                        </ul>
                        <li className={s.li}>
                            <a href='#design' className={s.link}>
                                5. Stick Protocol Design
                            </a>
                        </li>
                        <ul style={{paddingLeft: isDesktop ? '1vw' : '5vw'}}>
                            <li className={s.li}>
                                <a href='#overview' className={s.link}>
                                    5.1. Overview
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#registration' className={s.link}>
                                    5.2. User Registration
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#sticky-sessions' className={s.link}>
                                    5.3. Sticky Sessions Overview
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#re-establish' className={s.link}>
                                    5.4. Re-establishing Sessions
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#multiple-sessions' className={s.link}>
                                    5.5. Multiple Pairwise Sessions
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#session-life-cycle' className={s.link}>
                                    5.6. Sticky Session Life Cycle
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#creating' className={s.link}>
                                    5.7. Creating Sticky Sessions
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#encryption' className={s.link}>
                                    5.8. Making an Encryption
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#identity-keys' className={s.link}>
                                    5.9. Refreshing Identity Keys
                                </a>
                            </li>
                            <li className={s.li}>
                                <a href='#password-security' className={s.link}>
                                    5.10. Password Security
                                </a>
                            </li>
                            <ul style={{paddingLeft: isDesktop ? '1vw' : '5vw'}}>
                                <li className={s.li}>
                                    <a href='#double-hashing' className={s.link}>
                                        5.10.1. Double Hashing
                                    </a>
                                </li>
                                <li className={s.li}>
                                    <a href='#storing-passwords' className={s.link}>
                                        5.10.2. Storing Passwords
                                    </a>
                                </li>
                            </ul>
                            <li className={s.li}>
                                <a href='#decryption' className={s.link}>
                                    5.11. Decryption after STATE RESET
                                </a>
                            </li>
                        </ul>
                        <li className={s.li}>
                            <a href='#conclusion' className={s.link}>
                                6. Conclusion
                            </a>
                        </li>
                        <li className={s.li}>
                            <a href='#software-libraries' className={s.link}>
                                7. Software Libraries
                            </a>
                        </li>
                        <li className={s.li}>
                            <a href='#scientific-background' className={s.link}>
                                8. Scientific Background
                            </a>
                        </li>
                    </ul>

                    <h1 className={s.h1} id='motivation'>
                        1. Motivation
                    </h1>
                    <p className={s.p}>
                        End-to-End Encryption (E2EE) has become a de facto standard in messengers, especially after the
                        development of the secure messaging protocol – Signal. However, the adoption of E2EE has been
                        limited to messengers, and has not yet seen a noticeable trace in social networks, despite the
                        increase in users’ privacy violations. The Stick protocol is an E2EE protocol, based on the{' '}
                        <a className={s.link} target='_blank' href='https://www.signal.org/docs/' rel='noreferrer'>
                            Signal protocol
                        </a>
                        , specifically designed for social networks. The Stick Protocol is the first of its kind to
                        support re-establishable encryption sessions in an asynchronous and multi-device setting while
                        preserving forward secrecy and introducing backward secrecy.
                    </p>

                    <h1 className={s.h1} id='messaging-protocols'>
                        2. Messaging Protocols & Social Networks
                    </h1>
                    <p className={s.p}>What are the challenges for using E2EE in social network platforms?</p>
                    <p className={s.p} style={{paddingTop: '1vh'}}>
                        E2EE is being used for several applications from securing networking channels using SSL/TLS to
                        private communications in messengers to signing digital certificates, but all of these
                        applications can be summarized under one main use case:{' '}
                        <li style={{padding: '1vh'}}>
                            Establishing an end-to-end (E2E) encrypted short-term session between two parties for
                            authenticity verification and/or exchanging data confidentially.
                        </li>{' '}
                        A short-term session means that it does not require long-term persistence nor the ability to be
                        re-established. For all of these kinds of applications establishing a new encryption session
                        whenever needed is not a problem. In addition, the focus is always on communications between two
                        parties only. This has limited the usage of E2EE protocols to short-term sessions between two
                        parties. Using these short-term sessions in a social network to provide E2EE would not work.
                    </p>
                    <p className={s.p}>
                        In case of modern E2E encrypted messengers, when Alice wants to start chatting with Bob, she
                        would create an E2E encrypted session with Bob. If Alice is going to use another phone or
                        re-installs the messenger application, she can create a new session with Bob. This will result
                        in both of them being unable to decrypt any previously sent messages. In practice, these
                        messages are usually deleted from the server anyway once received, so there is no way to
                        redecrypt those messages. However, this behaviour in messengers is acceptable. Indeed, it is the
                        desired behaviour as normally the recipient would not need to decrypt your message more than
                        once. In contrast, this behaviour would be problematic on social networks. If Alice shared a
                        photo on a social network, and then a month later she wanted to reinstall the application, she
                        would expect every photo she has shared or was shared with her to still be there and be able to
                        decrypt it again. Also, Alice should be able to view these photos from other available devices
                        using her account. As a result, using E2EE in a social network was never practically feasible.
                    </p>

                    <h1 className={s.h1} id='pre-reading'>
                        3. Pre-Reading
                    </h1>
                    <h2 className={s.h2} id='x3dh'>
                        3.1. X3DH & Double Ratchet
                    </h2>
                    <p className={s.p}>
                        The Stick protocol is based on the Signal protocol. Before proceeding further, it is recommended
                        to have a read on{' '}
                        <a
                            className={s.a}
                            href='https://www.signal.org/docs/specifications/x3dh/'
                            target='_blank'
                            rel='noreferrer'>
                            The X3DH Key Agreement Protocol
                        </a>{' '}
                        and{' '}
                        <a
                            className={s.a}
                            href='https://www.signal.org/docs/specifications/doubleratchet/'
                            target='_blank'
                            rel='noreferrer'>
                            The Double Ratchet Algorithm
                        </a>{' '}
                        which are 2 key assets of the Signal protocol.
                    </p>

                    <h2 className={s.h2} id='group-messaging'>
                        3.2. Signal Protocol Group Messaging
                    </h2>
                    <p className={s.p}>
                        This subsection presents a brief overview of group messaging in the Signal protocol.
                    </p>
                    <p className={s.p}>
                        Group messages in the Signal protocol build on its pairwise encrypted sessions and use
                        server-side fanout to send the message to all members of a group. This is accomplished using{' '}
                        <b>Sender Keys</b>. The first time Alice wants to send a message to a group:
                    </p>
                    <ol className={s.ol}>
                        <li className={s.li}>Alice generates a Chain Key – a random 32-byte key.</li>
                        <li className={s.li}>Alice generates a Signature Key Pair.</li>
                        <li className={s.li}>
                            Alice combines the Chain Key and the public key of the Signature Key to make a Sender Key.
                        </li>
                        <li className={s.li}>
                            Alice individually encrypts the Sender Key to every group member using Signal’s pairwise
                            sessions.
                        </li>
                    </ol>
                    <p className={s.p} style={{paddingTop: '1vh'}}>
                        Then, for subsequent messages Alice sends to the group:
                    </p>
                    <ol className={s.ol}>
                        <li className={s.li}>
                            Alice derives a Message Key from the Chain Key, and updates the Chain Key – 1 Symmetric-key
                            ratchet step.
                        </li>
                        <li className={s.li}>Alice encrypts the message using AES256-CBC.</li>
                        <li className={s.li}>Alice signs the ciphertext using her signature Key.</li>
                        <li className={s.li}>
                            Alice sends the encrypted message to server which does server-side fan-out.
                        </li>
                    </ol>
                    <p className={s.p}>
                        You may have noticed that there is no "Double Ratchet" here, but only a single ratchet. This
                        provides forward-secrecy without backward secrecy. This is true for almost all current group
                        messaging protocols at the moment.
                    </p>

                    <h1 className={s.h1} id='preliminaries'>
                        4. Preliminaries
                    </h1>
                    <h2 className={s.h2} id='use-case'>
                        4.1. Use Case Description
                    </h2>
                    <p className={s.p}>
                        We present the Stick protocol design through a use case description that considers a social
                        network <b>SN </b>
                        with the criteria detailed below. On the social network <b>SN</b>, Alice has a <b>userId</b>,{' '}
                        <b>partyId</b>,<b> phoneNumber</b> and a <b>password</b>. Also, Alice would be connected to a
                        number of connections (friends), a number of groups, and her profile. When sharing a post Alice
                        can choose to share with one of the following <b>parties</b>:
                    </p>
                    <ul className={s.ul}>
                        <li className={s.li}>A paricular group</li>
                        <li className={s.li}>Selected group(s) and/or connection</li>
                        <li className={s.li}>Her profile (which includes all of Alice’s connections)</li>
                    </ul>
                    <p className={s.p} style={{paddingTop: '1vh'}}>
                        Alice is connected with N users: [User0, . . . , UserN]. Also, Alice is a member of 3 groups -
                        A, B and C. Alice wants to share photo A with Group A, photo B with both of Groups A and B, and
                        photo C with everyone she is connected with (her profile). Alice will share these photos from
                        her phone X. Now, there are 5 main requirements that Alice needs:
                    </p>
                    <ol className={s.ol}>
                        <li className={s.li}>
                            Alice wants every photo to be end-to-end encrypted to the designated party.
                        </li>
                        <li className={s.li}>
                            Alice wants to be able to view the photos she has shared from her phone X on her other phone
                            Y.
                        </li>
                        <li className={s.li}>
                            If Alice reinstalls the SN application, she wants to still be able to view any photos she
                            has previously shared or was shared with her, i.e., not lose any data, unlike the case with
                            E2EE messaging protocols.
                        </li>
                        <li className={s.li}>
                            Alice wants to still benefit from the security features of the Signal protocol.
                        </li>
                        <li className={s.li}>
                            Alice is interested in extra security features on top of what is provided by the Signal
                            protocol.
                        </li>
                    </ol>

                    <h2 className={s.h2} id='user-keys'>
                        4.2. User-Specific Key Types
                    </h2>
                    <ul
                        style={{
                            paddingTop: '2vh',
                            paddingLeft: isDesktop ? '2vw' : '5vw',
                        }}>
                        <li className={s.li}>
                            Identity Keys: a key pair of type Curve25519 generated at registration time, periodically
                            refreshed.
                        </li>
                        <li className={s.li}>
                            Signed Prekeys: a key pair of type Curve25519 generated at registration time, periodically
                            refreshed.
                        </li>
                        <li className={s.li}>
                            One-Time Prekeys: a list of key pairs of type Curve25519 generated at registration time.
                            Refilled as needed.
                        </li>
                    </ul>

                    <h2 className={s.h2} id='session-keys'>
                        4.3. Session Key Types
                    </h2>
                    <ul
                        style={{
                            paddingTop: '2vh',
                            paddingLeft: isDesktop ? '2vw' : '5vw',
                        }}>
                        <li className={s.li}>
                            Encryption Sender Key (ESK): consists of a 32-byte Chain Key and a Curve25519 Signature Key
                            Pair. Acts as the root key of a sender’s symmetric-key ratchet.
                        </li>
                        <li className={s.li}>
                            Decryption Sender Key (DSK): consists of a 32-byte Chain Key and a Curve25519 Signature
                            Public Key. Acts as the root key of a receiver’s symmetric-key ratchet.
                        </li>
                        <li className={s.li}>Chain Key: a 32-byte key used to derive Message Keys.</li>
                        <li className={s.li}>
                            Message Key: an 80-byte key that encrypts messages (posts). It consists of an AES-256 key, a
                            HMAC-SHA256 key, and 16 bytes for padding.
                        </li>
                    </ul>

                    <h2 className={s.h2} id='other-keys'>
                        4.4. Other Key Types
                    </h2>
                    <ul
                        style={{
                            paddingTop: '2vh',
                            paddingLeft: isDesktop ? '2vw' : '5vw',
                        }}>
                        <li className={s.li}>
                            Blob Key: consists of a 32-byte AES256 key and a 32-byte HMAC-SHA256 key. Used to encrypt
                            files.
                        </li>
                        <li className={s.li}>
                            Blob Secret: is the result of concatenating (||) Blob Key and the hash of the encrypted
                            file.
                        </li>
                    </ul>

                    <h2 className={s.h2} id='other-terms'>
                        4.5. Other Terms
                    </h2>
                    <ul
                        style={{
                            paddingTop: '2vh',
                            paddingLeft: isDesktop ? '2vw' : '5vw',
                        }}>
                        <li className={s.li}>Collection: a mix of groups and/or connections.</li>
                        <li className={s.li}>Party: can be one of 3 – a group, self-profile or a collection.</li>
                        <li className={s.li}>
                            One <i>Encryption</i>: an encryption of a photo, video, comment, notification, status or any
                            other data that needs to be E2E encrypted between a user and a party.
                        </li>
                    </ul>

                    <h2 className={s.h2} id='state-reset'>
                        4.6. STATE RESET
                    </h2>
                    <p className={s.p}>
                        Given an E2E encrypted application <i>SN</i>, <b>STATE RESET</b> is an event that occurs when a
                        user re-installs <i>SN</i> wiping all the encryption sessions they had, or when installing{' '}
                        <i>SN</i> on another phone having to establish new encryption sessions, and being unable to
                        decrypt the previously encrypted data.
                    </p>

                    <h1 className={s.h1} id='design'>
                        5. Stick Protocol Design
                    </h1>
                    <h2 className={s.h2} id='overview'>
                        5.1. Overview
                    </h2>
                    <p className={s.p}>
                        As discussed in{' '}
                        <a href='#messaging-protocols' className={s.link}>
                            section 2
                        </a>
                        , using common messaging protocols, such as the Signal protocol for a social network would be
                        problematic. If Alice shared a photo on <i>SN</i>, and then a month later she wanted to
                        reinstall the application, she would expect every photo she has shared or was shared with her to
                        still be there and be able to decrypt it again – and not be gone. Also, Alice should be able to
                        view these photos from any other device using her account. The Stick protocol solves this
                        problem by using sticky sessions (not referring to sticky sessions of load balancers – discussed
                        in a bit) while preserving the security features of Signal protocol. Moreover, the Stick
                        protocol provides extra security advantages regarding many-to-many encryption.
                    </p>

                    <h2 className={s.h2} id='registration'>
                        5.2. User Registration
                    </h2>
                    <p className={s.p}>
                        At registration time, Alice would generate an Identity key pair, a Signed prekey (with its
                        signature) and a list of one-time prekeys. Alice would then transmit the public credentials of
                        her keys to the server. The server would store those keys associated with Alice’s identifiers,
                        assign a userId and a partyId to Alice and return those IDs to her.
                    </p>

                    <h2 className={s.h2} id='sticky-sessions'>
                        5.3. Sticky Sessions Overview
                    </h2>
                    <p className={s.p}>
                        A sticky session is an E2E encrypted session between a user and a party that can be
                        re-established after STATE RESET in an asynchronous and multi-device environment, and keeps
                        track of the ratcheting Message Keys while preserving forward secrecy and introducing backward
                        secrecy.
                    </p>

                    <h2 className={s.h2} id='re-establish'>
                        5.4. Re-establishing Sessions
                    </h2>
                    <p className={s.p}>
                        As discussed in{' '}
                        <a href='#group-messaging' className={s.link}>
                            section 3.2
                        </a>{' '}
                        about group messaging, when Alice wants to share her sender key SK1 of a group G1 with Bob, she
                        would establish a normal Signal pairwise encrypted session with Bob, then encrypt SK1 to Bob.
                        Bob will not be able to decrypt that sender key after <b>STATE RESET</b> unless establishing the
                        same encryption session with Alice which she used to encrypt that key. In order to be able to
                        re-establish the same session, the private keys of the identity keys, signed prekeys and onetime
                        prekeys will be backed up encrypted with the help of{' '}
                        <a
                            target='_blank'
                            className={s.link}
                            href='https://github.com/P-H-C/phc-winner-argon2'
                            rel='noreferrer'>
                            Argon2
                        </a>
                        , arguably the most secure hashing algorithm and the winner of the PHC (Password Hashing
                        Competition) in 2015. Argon2 summarizes the state of the art in the design of memory-hard
                        functions and can be safely used to hash passwords for private credentials storage, key
                        derivation, and other applications. Alice or Bob can encrypt a private key for backup using the
                        following procedure:
                    </p>
                    <ol className={s.ol}>
                        <li className={s.li}>The user generates a securely random 32-byte salt.</li>
                        <li className={s.li}>The user generates a securely random 16-byte IV.</li>
                        <li className={s.li}>
                            The user creates a secret hash of their password using Argon2 with the salt.
                        </li>
                        <li className={s.li}>
                            The user uses the produced secret hash to encrypt the private key using AES256 in CBC mode.
                        </li>
                        <li className={s.li}>The user pads the produced cipher using IV.</li>
                    </ol>
                    <p className={s.p} style={{paddingTop: '1vh'}}>
                        After that, the user can securely back up a private key, and no one else including the server
                        may decrypt their key. Similarly, a user can decrypt their private key by extracting IV,
                        creating the secret hash again, then decrypting the cipher. Now, Bob will be able to
                        re-establish the same session he had with Alice at any time in the future and decrypt SK1.
                    </p>

                    <h2 className={s.h2} id='multiple-sessions'>
                        5.5. Multiple Pairwise Sessions
                    </h2>
                    <p className={s.p}>
                        At this point, Bob will not be able to re-establish every single session he has had with Alice,
                        but the first session only. Signal pairwise sessions have backward secrecy where no later key
                        can be derived from a previous key, i.e., when Bob re-establish a pairwise session he will be
                        able to decrypt the first message (sender key) only. So, if Alice encrypted to Bob another
                        sender key SK2 of group G2 Bob will not be able to decrypt SK2 or any subsequent sender keys. To
                        solve this problem, the Stick protocol allows two users to establish together multiple pairwise
                        sessions. So, a Signal pairwise session will be used to encrypt one sender key only. The next
                        sender key will be encrypted using a fresh pairwise session. This allows two users after{' '}
                        <b>STATE RESET</b> to reestablish as many sticky sessions as they had before <b>STATE RESET</b>,
                        while keeping the forward secrecy and backward secrecy of exchanging sender keys.
                    </p>

                    <h2 className={s.h2} id='session-life-cycle'>
                        5.6. Sticky Session Life Cycle
                    </h2>
                    <p className={s.p}>
                        In the Signal protocol group messaging, a user changes their sender key when the group’s
                        membership changes, or when reinstalling the app. So, if the user never needed to reinstall the
                        app and the group’s membership did not change, they will keep using the same sender key till no
                        end. This causes zero backward secrecy in group messaging. If an eavesdropper intercepted one
                        message key of a sender, they will be able to find every message key of that sender in the
                        future. The Stick protocol solves this problem by having a life cycle for its sticky sessions. A
                        sticky session has a life cycle of <i>N Encryptions</i> (ex.: 100 <i>Encryptions</i>). After{' '}
                        <i>N Encryptions</i>, the session will go from an "active" state to a "freeze" state. A sticky
                        session in freeze state cannot be used to do more <i>Encryptions</i>. However, it can still be
                        used for decryptions as all the message keys were being saved into the session’s internal state
                        on the user’s device
                    </p>

                    <p className={s.p} style={{paddingTop: '1vh'}}>
                        Whenever Alice makes a new post from her phone X, she will make a few <i>Encryptions</i> (photo,
                        caption, notification, etc.) This will cause the chain of her <i>Encryption</i> Sender Key SK-X
                        to ratchet a few steps as it is generating new Message Keys. SK-X current chain step will be
                        updated on the server. After that, when Alice wants to make another post from her other phone Y
                        encrypted using SK-X, she will know from which step she should start (by contacting the server).
                        When the chain of SK-X reaches N steps, that session will go into "freeze" state. Then, Alice
                        will create a new sticky session, generate a new sender key, and encrypt her new Decryption
                        Sender Key to the target party members. The end result is that a user’s Sender Key of a party
                        will be automatically changing every <i>N Encryptions</i>. This introduces backward secrecy
                        every a maximum of <i>N Encryptions</i>, and still keeps forward secrecy for every single{' '}
                        <i>Encryption</i>.
                    </p>

                    <h2 className={s.h2} id='creating'>
                        5.7. Creating Sticky Sessions
                    </h2>
                    <p className={s.p}>
                        When Alice wants to make an Encryption of a photo she will call a function <i>encryptFile()</i>{' '}
                        providing 3 main parameters:
                    </p>
                    <ul className={s.ul}>
                        <li className={s.li}>path: a string of the file path to be encrypted.</li>
                        <li className={s.li}>
                            userId: Alice’s unique UUID provided by the server at registration time.
                        </li>
                        <li className={s.li}>stickId: the sticky session ID.</li>
                    </ul>

                    <p className={s.p} style={{textAlign: 'center'}}>
                        <b>stickId</b> = (targetPartyId || activeChainId)
                    </p>

                    <p className={s.p}>
                        Alice needs to know what is the stickId. To find the stickId, Alice will send a request to the
                        server that includes the list of connections and groups she wishes to share a post with. The
                        server will return the following:
                    </p>
                    <ul className={s.ul}>
                        <li className={s.li}>The stickId.</li>
                        <li className={s.li}>
                            A list of userIds for which Alice needs to share the sender key of her active sticky session
                            for that party.
                        </li>
                    </ul>
                    <p className={s.p} style={{paddingTop: '1vh'}}>
                        For the server to find the stickId, it first needs to determine the targetPartyId. If the target
                        party is Alice’s profile, then it will simply be her own partyId, and if it is a group, then it
                        will be the groupId. If the target party is a collection then, the server will check whether
                        there is a party object associated with that collection. If so, the targetPartyId will be this
                        party’s id, otherwise, the server will create a new party object and associate it with that
                        collection. After determining the partyId, the server needs to find the chainId. The server will
                        fetch the last senderKey SK-L associated with Alice and that partyId. If its current chain step
                        is below N, then the activeChainId will be SKL’s chainId, otherwise, it will be SK-L’s chainId
                        plus one. Next, the server will loop over the target party members to find which of them do not
                        have Alice’s sender key for that particular stickId. Finally, the server will return to Alice
                        the stickId and the list of users that she needs to encrypt her sender key to. Now, Alice can
                        check whether she already has a sticky session on her device associated with that stickId and
                        create one if needed, encrypt her sender key to the list of users individually using Signal’s
                        pairwise sessions, and upload her encrypted sender keys to the server.
                    </p>

                    <h2 className={s.h2} id='encryption'>
                        5.8. Making an <i>Encryption</i>
                    </h2>
                    <p className={s.p}>
                        Now that Alice knows the right stickId, she can execute{' '}
                        <i>encryptFile(path, userId, stickId)</i> which will do two things:
                    </p>

                    <ol className={s.ol} type='A'>
                        <li className={s.li}>Encrypt the photo file and get a Blob Secret.</li>
                        <li className={s.li}>Encrypt the Blob Secret like a normal message.</li>
                    </ol>
                    <p className={s.p} style={{paddingTop: '1vh'}}>
                        Alice will encrypt the photo file as follows:
                    </p>
                    <ol className={s.ol}>
                        <li className={s.li}>Alice generates an ephemeral AES256 key.</li>
                        <li className={s.li}>Alice generates an ephemeral HMAC-SHA256 key.</li>
                        <li className={s.li}>Alice generates a 16-byte securely random IV.</li>
                        <li className={s.li}>
                            Alice encrypts the photo file using the AES256 key in CBC mode with the random IV.
                        </li>
                        <li className={s.li}>Alice appends a MAC of the ciphertext using the HMAC-SHA256 key.</li>
                        <li className={s.li}>
                            Alice makes a Blob Secret as (AES256 key || HMACSHA256 key k hash of the encrypted file).
                        </li>
                    </ol>
                    <p className={s.p} style={{paddingTop: '1vh'}}>
                        Next, Alice will encrypt the Blob Secret as follows:
                    </p>
                    <ol className={s.ol}>
                        <li className={s.li}>
                            Alice loads the sticky session associated with the stickId and her userId.
                        </li>
                        <li className={s.li}>
                            Alice calculates a new Message Key as: Message Key = HMAC-SHA256(Chain Key, 0x01)
                        </li>
                        <li className={s.li}>
                            Alice encrypts the Blob Secret with the Message Key using AES256 in CBC mode.
                        </li>
                        <li className={s.li}>
                            Alice signs the ciphertext using the private signature key of her Encryption Sender Key for
                            that sticky session.
                        </li>
                        <li className={s.li}>Alice adds the Message Key in the sticky session state.</li>
                        <li className={s.li}>
                            Alice ratchets the Chain Key one step: Chain Key = HMAC-SHA256(Chain Key, 0x02)
                        </li>
                        <li className={s.li}>
                            Alice saves the new state of the sticky session and can start uploading the encrypted data.
                        </li>
                    </ol>

                    <h2 className={s.h2} id='identity-keys'>
                        5.9. Refreshing Identity Keys
                    </h2>
                    <p className={s.p}>
                        A compromise of a user’s identity key can have a devastating effect on the security of future
                        communications. An attacker with a user’s identity private key can impersonate the compromised
                        user. Within the Signal protocol, if a user finds out that their identity private key has been
                        compromised, they can replace their identity key by reinstalling the app. However, a compromised
                        user may never find out that their identity private key has been leaked. To mitigate this, the
                        Stick protocol refreshes the identity key every while. Similar to signed prekeys, a user can
                        have multiple identity keys where only one is active.
                    </p>
                    <p className={s.p} style={{paddingTop: '1vh'}}>
                        Every encrypted sender key will have an associated identity key ID from the receiver. This
                        allows the receiver to know which of their identity keys was used to encrypt that sender key.
                    </p>

                    <h2 className={s.h2} id='password-security'>
                        5.10. Password Security
                    </h2>
                    <h3 className={s.h3} id='double-hashing'>
                        5.10.1. Double Hashing
                    </h3>
                    <i className={s.p} style={{paddingTop: '2vh'}}>
                        Not referring to the collision resolving technique.
                    </i>
                    <p className={s.p}>
                        In the Stick protocol, the user’s private keys are backed up encrypted using secret keys derived
                        from password hashes. Also, the password is used as a 2FA (Two-Factor Authentication). Although,
                        typically a server does not store the user’s password, only hashes, the user should not be
                        forced to trust the server. In addition, since the user’s password is used in backing up their
                        private keys, therefore, the user’s password should never be sent to the server, as this can
                        make it vulnerable to attacks by eavesdroppers or even the server itself.
                    </p>
                    <p className={s.p}>
                        To avoid such attacks, the Stick protocol uses <b>double-hashing</b>, where the password is
                        hashed on the user’s device before being sent to the server. The server will treat that hash as
                        the plaintext password, and will hash it again. The server will store the resultant{' '}
                        <b>double-hashed</b> password as the password hash. That way, the server can verify the user’s
                        password without it having to leave the user’s device.
                    </p>

                    <h3 className={s.h3} id='storing-passwords'>
                        5.10.2. Storing Passwords
                    </h3>
                    <p className={s.p}>
                        Every while, the user would need to refill their store of one-time prekeys whenever it goes
                        below a certain threshold. While doing so, they would also need to backup the corresponding
                        private keys encrypted using secret keys derived from the password. Obviously, the user cannot
                        be asked to enter their password every time this process needs to happen. Therefore, the
                        password must be stored somewhere on the user’s device securely.
                    </p>
                    <p className={s.p} style={{paddingTop: '1vh'}}>
                        The Stick protocol employs end-to-end encrypted sensitive storage APIs from the underlying
                        operating system (OS) to securely store the user’s password persistently. On iOS, the Keychain
                        services API is used, while on Android the Block Store API is used. If the underlying OS does
                        not support an E2E encrypted sensitive storage API, then an alternate solution is to encrypt the
                        password using an AES256 key, then store the ciphertext with the user’s OS account, and store
                        the key with the user’s <i>SN</i> application account. That way only the user and no one else –
                        including the OS provider and the application service provider – can access the password.
                    </p>
                    <p className={s.p} style={{paddingTop: '1vh'}}>
                        Storing the user’s password persistently would also help the user recover their password in case
                        they forgot it.
                    </p>

                    <h2 className={s.h2} id='decryption'>
                        5.11. Decryption after STATE RESET
                    </h2>
                    <figure>
                        <img
                            className={s.flowDiagram}
                            src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/FlowDiagram.png?alt=media&token=c1e09bfc-6d96-4a44-8db5-6587725e9ba5'
                        />
                        <figcaption className={s.figcaption}>
                            A flow diagram showing decryption process after <b>STATE RESET</b>
                            <br />
                            <br />
                            <i>
                                * The above is a simplified picture — decentralization is not included in this context
                            </i>
                        </figcaption>
                    </figure>
                    <p className={s.p}>
                        As shown in the above figure, Alice will go through the following procedure after{' '}
                        <b>STATE RESET</b> to re-establish the sticky sessions, then decrypt a photo X:
                    </p>
                    <ol className={s.ol}>
                        <li className={s.li}>Firstly, a user needs to verify their phone number.</li>
                        <li className={s.li}>
                            Upon verification, the server returns to the user the password’s salt used in Double Hashing
                            and a Limited Access Token (LAT), which the user can use to send a password verification
                            request.
                        </li>
                        <li className={s.li}>
                            The user then creates the Initial Password Hash (IPH) and sends a request to the server that
                            includes the LAT.
                        </li>
                        <li className={s.li}>
                            The server verifies the LAT, then creates the password’s double hash and verify it, then
                            returns to the user his IKs, SPKs, OPKs and ESKs along with an Auth Token.
                        </li>
                        <li className={s.li}>
                            The user decrypts the private keys of his IKs, SPKs and OPKs as discussed in 3.2.3.
                        </li>
                        <li className={s.li}>The user re-establishes the pairwise sessions.</li>
                        <li className={s.li}>
                            The user decrypts his Encryption Sender Keys and reestablishes their sticky sessions.
                        </li>
                        <li className={s.li}>
                            The user comes across photo X that they have not reestablished its sticky session yet, so
                            they fetch the DSK associated with photo X.
                        </li>
                        <li className={s.li}>
                            The user decrypts DSK using the corresponding pairwise session, and re-establishes its
                            sticky session.
                        </li>
                        <li className={s.li}>
                            The user ratchets the chain the necessary number of steps to get the right Message Key MK of
                            photo X.
                        </li>
                        <li className={s.li}>
                            The user uses MK to decrypt the Blob Secret of photo X to get the Blob Key and the hash,
                            which are then be used to decrypt and verify photo X.
                        </li>
                    </ol>

                    <p className={s.p}>
                        As shown in the above diagram, requests to the server that first needs verification by some
                        specific piece of data are marked with a blue shield. The first shield verifies the phone code,
                        the second one verifies the password and the LAT, and the third one verifies the Auth token.
                        Also, processing steps where there is decryption happening are marked with a golden key. You can
                        see that for Alice to finally decrypt photo X after <b>STATE RESET</b> she had to go through 5
                        different decryption processes (and pass 3 barriers). This emphasizes the security of the Stick
                        protocol.
                    </p>

                    <h1 className={s.h1} id='conclusion'>
                        6. Conclusion
                    </h1>
                    <p className={s.p}>
                        Now, let’s reflect back on the use case we had. Alice can share photo A with group A using group
                        A’s id as the stickId, and photo B to both of groups A & B using the partyId associated with
                        that collection as the stickId, and photo C to her profile using her own partyId as the stickId.
                    </p>
                    <div className={s.ticksContainer}>
                        <p className={s.p}>
                            ✔ As discussed throughout the Stick protocol, all of Alice’s photos will be end-to-end
                            encrypted to the designated parties.
                        </p>
                        <p className={s.p}>
                            ✔ Alice can view her posts after reinstalling the application as shown in the above flow
                            diagram.
                        </p>
                        <p className={s.p}>
                            ✔ Alice can view her posts from any other phone using her account in a process similar to
                            the above flow diagram.
                        </p>
                        <p className={s.p}>
                            ✔ Alice still benefits from all of the security features of the Signal protocol, such as
                            X3DH.
                        </p>
                        <p className={s.p}>✔ Alice benefits from identity keys self-healing.</p>
                        <p className={s.p}>
                            ✔ Sharing sender keys has perfect forward secrecy and perfect backward secrecy using
                            multiple pairwise sessions.
                        </p>
                        <p className={s.p}>✔ Sharing posts using sticky sessions provides perfect forward secrecy.</p>
                        <p className={s.p}>
                            ✔ Sharing posts using sticky sessions provides backward secrecy every a maximum of{' '}
                            <i>N Encryptions</i>.
                        </p>
                    </div>

                    <h1 className={s.h1} id='software-libraries'>
                        7. Software Libraries
                    </h1>

                    <p className={s.p}>The Stick protocol implementation is composed of 4 libraries:</p>
                    <ul className={s.ul}>
                        <li className={s.li}>Stick protocol Android library (Gradle package)</li>
                        <li className={s.li}>Stick protocol iOS library (CocoaPod framework)</li>
                        <li className={s.li}>Stick protocol server library (PIP package)</li>
                        <li className={s.li}>Stick protocol client handlers library (NPM package)</li>
                    </ul>
                    <p className={s.p}>
                        All of the above libraries are open-source{' '}
                        <a
                            className={s.link}
                            target='_blank'
                            href='https://github.com/sticknet/stick-protocol'
                            rel='noreferrer'>
                            available on GitHub
                        </a>
                    </p>

                    <h1 className={s.h1} id='scientific-background'>
                        8. Scientific Background
                    </h1>
                    <p className={s.p}>
                        For more on the Stick protocol, a{' '}
                        <a className={s.link} target='_blank' href='stick-protocol.pdf'>
                            scientific research paper
                        </a>{' '}
                        is available, which further includes formal verification and performance evaluation.
                    </p>
                </div>
            </div>
        );
    }
}

export default StickProtocolScreen;

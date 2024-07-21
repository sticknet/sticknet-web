import React, {Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {HashLink as Link} from 'react-router-hash-link';
import gs from '../global.css';
import s from './css/StickProtocolScreen.css';

const iosStyle = {padding: '1vw', marginTop: '2vh', background: '#F3F3FF'};
const andStyle = {padding: '1vw', marginTop: '2vh', background: '#E6FFE6'};

const a1 =
    'ProgressEventImpl progressEvent = new ProgressEventImpl();\n JSONObject response = stickProtocol.initialize(userId, password, progressEvent);';
const b1 =
    'let response = sp.initialize(userId: userId, password: password, progressEvent: progEventCallback(progEvent:))';
const a2 = 'JSONObject response = stickProtocol.createStickySession(userId, stickId);';
const b2 = 'let response = sp.createStickySession(userId: userId, stickId: stickId)';
const a3 = 'stickProtocol.initPairwiseSession(bundle);';
const b3 = 'sp.initPairwiseSession(bundle: bundle)';
const a4 = 'String encryptedSenderKey = stickProtocol.getSenderKey(senderId, targetId, stickId, isSticky);';
const b4 =
    'let encryptedSenderKey = sp.getSenderKey(senderId: senderId, targetId: targetId, stickId: stickId, isSticky: isSticky)';
const a5 = 'String ciphertext = stickProtocol.encryptText(senderId, stickId, text, isSticky);';
const b5 = 'let ciphertext = sp.encryptText(userId: userId, stickId: stickId, text: text, isSticky: isSticky)';
const a6 = 'boolean exists = stickProtocol.sessionExists(senderId, stickId);';
const b6 = 'let exists = sp.sessionExists(senderId: senderId, stickId: stickId)';
const a7 = 'stickProtocol.initStickySession(senderId, stickId, cipherSenderKey, identityKeyId);';
const b7 =
    'sp.initStickySession(senderId: senderId, stickId: stickId, cipherSenderKey: cipherSenderKey, identityKeyId: identityKeyId)';
const a8 = 'String plaintext = stickProtocol.decryptText(senderId, stickId, cipher, isSticky);';
const b8 = 'let plaintext = sp.decryptText(senderId: senderId, stickId: stickId, cipher: cipher, isSticky: isSticky)';
const a9 = 'JSONObject response = stickProtocol.encryptFile(senderId, stickId, filePath, isSticky);';
const b9 =
    'let response = sp.encryptFile(senderId: senderId, stickId: stickId, filePath: filePath, isSticky: isSticky)';
const a10 =
    'String absolutePath = stickProtocol.decryptFile(senderId, stickId, filePath, cipher, outputPath, isSticky);';
const b10 =
    'let absolutePath = sp.decryptFile(senderId: senderId, stickId: stickId, filePath: filePath, cipher: cipher, size: size, outputPath: outputPath, isSticky: isSticky)';
const a11 =
    'ProgressEventImpl progressEvent = new ProgressEventImpl();\n stickProtocol.reInitialize(bundle, password, userId, progressEvent);';
const b11 =
    'sp.reInitialize(bundle: bundle, password: password, userId: userId, progressEvent: progEventCallback(progEvent:))';
const a12 = 'stickProtocol.decryptPreKeys(preKeys);';
const b12 = 'sp.decryptPreKeys(preKeys: preKeys)';
const a13 = 'JSONArray prekeys = stickProtocol.generatePreKeys(nextPreKeyId, count);';
const b13 = 'let prekeys = sp.generatePreKeys(nextPreKeyId: nextPreKeyId, count: count)';
const a14 =
    'JSONObject newIdentityKey = stickProtocol.refreshIdentityKey(TimeUnit.DAYS.toMillis(days));\n JSONObject newSignedPrekey = stickProtocol.refreshSignedPreKey(TimeUnit.DAYS.toMillis(days));';
const b14 =
    'let newIdentityKey = sp.refreshIdentityKey(identityKeyAge: daysInMillis)\n let newSignedPrekey = sp.refreshSignedPreKey(signedPreKeyAge: daysInMillis)';
const a15 = 'String initialPasswordHash = stickProtocol.createPasswordHash(password, passwordSalt);';
const b15 = 'let initialPasswordHash = sp.createPasswordHash(password: password, salt: passwordSalt)';
const a16 =
    'ProgressEventImpl progressEvent = new ProgressEventImpl();\n JSONObject keys = stickProtocol.reEncryptKeys(password, progressEvent);';
const b16 = 'let keys = sp.reEncryptKeys(password: password, progressEvent: progEventCallback(progEvent:))';
const a17 = 'JSONObject response = stickProtocol.createNewPasswordHash(password);';
const b17 = 'let response = sp.createNewPasswordHash(password: password)';
const a18 = 'String password = stickProtocol.recoverPassword(userId);';
const b18 = 'let password = sp.recoverPassword(userId: userId)';
const a19 = 'int step = stickProtocol.getChainStep(userId, stickId);';
const b19 = 'let step = sp.getChainStep(userId: userId, stickId: stickId)';
const a20 = 'stickProtocol.ratchetChain(userId, stickId, steps);';
const b20 = 'sp.ratchetChain(userId: userId, stickId: stickId, steps: steps)';
const a21 = 'boolean isInitialized = stickProtocol.isInitialized();';
const b21 = 'let isInitialized = sp.isInitialized()';
const a22 = 'stickProtocol.resetDatabase();';
const b22 = 'sp.resetDatabase()';
const a23 = 'boolean exists = stickProtocol.pairwiseSessionExists(oneTimeId);';
const b23 = 'boolean exists = let exists = sp.pairwiseSessionExists(oneTimeId: oneTimeId)';
const a24 = 'String ciphertext = stickProtocol.encryptTextPairwise(userId, text);';
const b24 = 'let cipherText = sp.encryptTextPairwise(userId: userId, text: text)';
const a25 = 'String plaintext = stickProtocol.decryptTextPairwise(oneTimeId, isStickyKey, ciphertext)';
const b25 = 'let plaintext = sp.decryptTextPairwise(senderId: oneTimeId, isStickyKey: isStickyKey, cipher: ciphertext)';
const a26 = 'JSONObject response = stickProtocol.encryptFilePairwise(userId, filePath);';
const b26 = 'let response = sp.encryptFilePairwise(userId: userId, filePath: filePath)';
const a27 = 'String absolutePath = stickProtocol.decryptFilePairwise(senderId, filePath, cipher, outputPath);';
const b27 =
    'let absolutePath = sp.decryptFilePairwise(senderId: senderId, filePath: filePath, cipher: cipher, size: size, outputPath: outputPath)';
const a28 = 'stickProtocol.reinitMyStickySession(userId, senderKey);';
const b28 = 'sp.reinitMyStickySession(userId: userId, senderKey: senderKey)';
const a29 = 'stickProtocol.initStandardGroupSession(senderId, groupId, cipherSenderKey);';
const b29 = 'sp.initStandardGroupSession(senderId: senderId, groupId: groupId, cipherSenderKey: cipherSenderKey)';

interface SPUsageScreenState {
    focused: string | null;
}

class SPUsageScreen extends Component<object, SPUsageScreenState> {
    private offset: {[key: string]: number} = {};

    constructor(props: object) {
        super(props);
        this.state = {
            focused: 'Getting-Started',
        };
    }

    componentDidMount() {
        document.title = 'Sticknet | Stick Protocol - Usage Docs';
        const sections = document.getElementById('sections')?.childNodes;
        if (sections) {
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i] as HTMLElement;
                if (section.id) {
                    this.offset[section.id] = section.offsetTop - window.innerHeight * 0.9;
                }
            }
        }

        const offsets = Object.entries(this.offset).reverse();
        window.onscroll = () => {
            const y = window.scrollY;
            for (let i = 0; i < offsets.length; i++) {
                const item = offsets[i];
                const element = document.getElementById(item[0]);
                if (element && y > item[1]) {
                    if (
                        item[0] === 'Utility-Methods' &&
                        y > element.offsetTop + element.offsetHeight - window.innerHeight * 0.8
                    ) {
                        this.setState({focused: null});
                        break;
                    }

                    this.setState({focused: item[0]});
                    break;
                }
            }
        };
    }

    handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const href = e.currentTarget.href;
        const id = href.slice(href.lastIndexOf('#') + 1);
        setTimeout(() => this.setState({focused: id}), 0);
    };

    render() {
        const isDesktop = window.innerWidth > window.innerHeight;
        const {focused} = this.state;
        return (
            <div className={gs.main}>
                <div className={`${gs.screenContainer} ${s.bodyBorder}`}>
                    <img
                        src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/StickProtocol.png?alt=media&token=d4c31888-f3b1-4827-9475-e5fa17051f38'
                        className={s.spImg}
                    />
                    <h1 className={s.title}>The Stick Protocol</h1>
                    <p className={s.slogan}>
                        Re-Establishable Group End-to-End Encryption with Post-Compromise Security
                    </p>
                    <b className={s.slogan} style={isDesktop ? {marginBottom: '5vh'} : {}}>
                        Usage Documentation
                    </b>
                    <div className={s.contents} id='contents'>
                        {!isDesktop && (
                            <h2 className={s.h2} style={{paddingTop: '5vh'}}>
                                Table of Contents
                            </h2>
                        )}
                        <ul
                            style={{
                                paddingTop: '2vh',
                                paddingLeft: isDesktop ? '1vw' : '5vw',
                            }}>
                            <li
                                className={s.li}
                                style={{
                                    color: !isDesktop || focused === 'Getting-Started' ? '#6060FF' : '#000000',
                                }}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color: !isDesktop || focused === 'Getting-Started' ? '#6060FF' : '#000000',
                                    }}
                                    href='#Getting-Started'
                                    className={s.menuItem}>
                                    Getting Started
                                </a>
                            </li>
                            <li
                                className={s.li}
                                style={{
                                    color: !isDesktop || focused === 'Registration' ? '#6060FF' : '#000000',
                                }}>
                                <a
                                    href='#Registration'
                                    className={s.menuItem}
                                    onClick={this.handleClick}
                                    style={{
                                        color: !isDesktop || focused === 'Registration' ? '#6060FF' : '#000000',
                                    }}>
                                    Registration
                                </a>
                            </li>
                            <li
                                className={s.li}
                                style={{
                                    color: !isDesktop || focused === 'Creating-Sticky-Session' ? '#6060FF' : '#000000',
                                }}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color:
                                            !isDesktop || focused === 'Creating-Sticky-Session' ? '#6060FF' : '#000000',
                                    }}
                                    href='#Creating-Sticky-Session'
                                    className={s.menuItem}>
                                    Creating Sticky Session
                                </a>
                            </li>
                            <li
                                style={{
                                    color:
                                        !isDesktop || focused === 'Creating-Pairwise-Session' ? '#6060FF' : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color:
                                            !isDesktop || focused === 'Creating-Pairwise-Session'
                                                ? '#6060FF'
                                                : '#000000',
                                    }}
                                    href='#Creating-Pairwise-Session'
                                    className={s.menuItem}>
                                    Creating Pairwise Session
                                </a>
                            </li>
                            <li
                                style={{
                                    color: !isDesktop || focused === 'Sharing-Sender-Keys' ? '#6060FF' : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color: !isDesktop || focused === 'Sharing-Sender-Keys' ? '#6060FF' : '#000000',
                                    }}
                                    href='#Sharing-Sender-Keys'
                                    className={s.menuItem}>
                                    Sharing Sender Keys
                                </a>
                            </li>
                            <li
                                style={{
                                    color: !isDesktop || focused === 'Encrypting' ? '#6060FF' : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color: !isDesktop || focused === 'Encrypting' ? '#6060FF' : '#000000',
                                    }}
                                    href='#Encrypting'
                                    className={s.menuItem}>
                                    Encrypting
                                </a>
                            </li>
                            <li
                                style={{
                                    color:
                                        !isDesktop || focused === 'Initializing-Sticky-Session-from-a-Shared-Sender-Key'
                                            ? '#6060FF'
                                            : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color:
                                            !isDesktop ||
                                            focused === 'Initializing-Sticky-Session-from-a-Shared-Sender-Key'
                                                ? '#6060FF'
                                                : '#000000',
                                    }}
                                    href='#Initializing-Sticky-Session-from-a-Shared-Sender-Key'
                                    className={s.menuItem}>
                                    Initializing Sticky Session <br />
                                    from a Shared Sender Key
                                </a>
                            </li>
                            <li
                                style={{
                                    color: !isDesktop || focused === 'Decrypting' ? '#6060FF' : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color: !isDesktop || focused === 'Decrypting' ? '#6060FF' : '#000000',
                                    }}
                                    href='#Decrypting'
                                    className={s.menuItem}>
                                    Decrypting
                                </a>
                            </li>
                            <li
                                style={{
                                    color: !isDesktop || focused === 'Devices-Synchronization' ? '#6060FF' : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color:
                                            !isDesktop || focused === 'Devices-Synchronization' ? '#6060FF' : '#000000',
                                    }}
                                    href='#Devices-Synchronization'
                                    className={s.menuItem}>
                                    Devices Synchronization
                                </a>
                            </li>
                            <li
                                style={{
                                    color: !isDesktop || focused === 'Files' ? '#6060FF' : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color: !isDesktop || focused === 'Files' ? '#6060FF' : '#000000',
                                    }}
                                    href='#Files'
                                    className={s.menuItem}>
                                    Files
                                </a>
                            </li>
                            <li
                                style={{
                                    color:
                                        !isDesktop || focused === 'Logging-In-And-Re-establishing-Sessions'
                                            ? '#6060FF'
                                            : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color:
                                            !isDesktop || focused === 'Logging-In-And-Re-establishing-Sessions'
                                                ? '#6060FF'
                                                : '#000000',
                                    }}
                                    href='#Logging-In-And-Re-establishing-Sessions'
                                    className={s.menuItem}>
                                    Logging In & Re-establishing Sessions
                                </a>
                            </li>
                            <li
                                style={{
                                    color: !isDesktop || focused === 'Refresh-Keys' ? '#6060FF' : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color: !isDesktop || focused === 'Refresh-Keys' ? '#6060FF' : '#000000',
                                    }}
                                    href='#Refresh-Keys'
                                    className={s.menuItem}>
                                    Refresh Keys
                                </a>
                            </li>
                            <li
                                style={{
                                    color: !isDesktop || focused === 'Initial-Password-Hash' ? '#6060FF' : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color:
                                            !isDesktop || focused === 'Initial-Password-Hash' ? '#6060FF' : '#000000',
                                    }}
                                    href='#Initial-Password-Hash'
                                    className={s.menuItem}>
                                    Initial Password Hash
                                </a>
                            </li>
                            <li
                                style={{
                                    color: !isDesktop || focused === 'Changing-Password' ? '#6060FF' : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color: !isDesktop || focused === 'Changing-Password' ? '#6060FF' : '#000000',
                                    }}
                                    href='#Changing-Password'
                                    className={s.menuItem}>
                                    Changing Password
                                </a>
                            </li>
                            <li
                                style={{
                                    color: !isDesktop || focused === 'Recovering-Password' ? '#6060FF' : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color: !isDesktop || focused === 'Recovering-Password' ? '#6060FF' : '#000000',
                                    }}
                                    href='#Recovering-Password'
                                    className={s.menuItem}>
                                    Recovering Password
                                </a>
                            </li>
                            <li
                                style={{
                                    color:
                                        !isDesktop || focused === 'Signal-Pairwise-Session-Methods'
                                            ? '#6060FF'
                                            : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color:
                                            !isDesktop || focused === 'Signal-Pairwise-Session-Methods'
                                                ? '#6060FF'
                                                : '#000000',
                                    }}
                                    href='#Signal-Pairwise-Session-Methods'
                                    className={s.menuItem}>
                                    Signal Pairwise Session Methods
                                </a>
                            </li>
                            <li
                                style={{
                                    color: !isDesktop || focused === 'Utility-Methods' ? '#6060FF' : '#000000',
                                }}
                                className={s.li}>
                                <a
                                    onClick={this.handleClick}
                                    style={{
                                        color: !isDesktop || focused === 'Utility-Methods' ? '#6060FF' : '#000000',
                                    }}
                                    href='#Utility-Methods'
                                    className={s.menuItem}>
                                    Utility Methods
                                </a>
                            </li>
                        </ul>
                    </div>
                    <p className={s.description} style={{paddingTop: '2vh'}}>
                        <b>Note</b>:{' '}
                        <i>
                            Although the Stick Protocol was initially developed with a primary focus on social network
                            platforms, it can be extended to other areas where end-to-end encrypted re-establishable
                            sessions would be useful, such as cloud storages
                        </i>
                        .
                    </p>

                    <div id='sections'>
                        <div id='Getting-Started'>
                            <h2 className={s.h2}>Getting Started</h2>
                            <p className={s.p}>
                                This is the usage documentation. For the technical documentation{' '}
                                <Link className={s.link} to='/stick-protocol'>
                                    click here
                                </Link>
                                .
                            </p>
                            <p className={s.p}>
                                Firstly, make sure you have followed the installation steps{' '}
                                <a
                                    className={s.link}
                                    target='_blank'
                                    href='https://github.com/sticknet/stick-protocol'
                                    rel='noreferrer'>
                                    here
                                </a>
                                .
                            </p>
                            <p className={s.p}>
                                Also, check out{' '}
                                <a
                                    href='https://github.com/sticknet/stick-protocol/blob/main/server/stick_protocol/models.py'
                                    target='_blank'
                                    className={s.link}
                                    rel='noreferrer'>
                                    this file
                                </a>{' '}
                                for the recommended representation of storing keys on server.
                            </p>
                            <p className={s.p}>
                                The Stick protocol is an end-to-end encryption protocol specifically designed for social
                                network platforms, based on the Signal protocol.The Stick protocol was implemented to be
                                a superset to the Signal protocol making the Stick protocol logic external to the Signal
                                protocol. This allows the Signal protocol to be used in parallel with the Stick
                                protocol, from just the Stick protocol library. The Stick protocol was implemented to be
                                a fully comprehensive Android and iOS library (rather than just a Java and C library)
                                which can be simply dropped into a social network application, and provide end-to-end
                                encryption using re-establishable sticky sessions, with as low development overhead as
                                possible.{' '}
                            </p>
                            <h3 className={s.h3}>Android</h3>

                            <p className={s.p}>
                                Initialize StickProtocol instance passing in the application context and package name
                            </p>

                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                StickProtocol stickProtocol = new StickProtocol(context, PACKAGE_NAME);
                            </SyntaxHighlighter>

                            <h3 className={s.h3}>iOS</h3>

                            <p className={s.p}>
                                Initialize StickProtocol (SP) instance passing in the bundle_id, access group and a{' '}
                                <a
                                    target='_blank'
                                    className={s.link}
                                    href='https://github.com/yapstudios/YapDatabase'
                                    rel='noreferrer'>
                                    Yap database
                                </a>{' '}
                                instance.
                            </p>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                let sp = SP(service: BUNDLE_ID, accessGroup: ACCESS_GROUP, db: yapDatabase)
                            </SyntaxHighlighter>
                        </div>

                        <div id='Registration'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Registration
                            </h2>
                            <p className={s.p}>
                                At registration time, call the initialize() method (preferably on a background thread)
                                to generate the keys. To be called for every user once at registration time.
                                <br />
                                <b className={s.p}>Parameters:</b>
                                <ul className={s.ul}>
                                    <li className={s.li}>userId - String, unique userId</li>
                                    <li className={s.li}>password - String, user's plaintext password</li>
                                    <li className={s.li}>
                                        progressEvent - An optional progress event to be implemented to provide progress
                                        feedback to the user while the keys are being generated.
                                    </li>
                                </ul>
                                <p className={s.p}>
                                    <b>Return: </b>JSONObject (or dictionary) - contains the following:
                                </p>
                                <ul className={s.ul}>
                                    <li className={s.li}>1 identity key</li>
                                    <li className={s.li}>1 signed prekey</li>
                                    <li className={s.li}>10 prekeys</li>
                                    <li className={s.li}>localId</li>
                                    <li className={s.li}>oneTimeId</li>
                                    <li className={s.li}>initial password hash</li>
                                    <li className={s.li}>password salt</li>
                                </ul>
                            </p>
                            <p className={s.p}>
                                <b>Note</b>: the <i>oneTimeId</i> above is a UUID that changes every time the user logs
                                in and can be used as the userId within the Signal protocol if needed. That way, every
                                user would have two associated IDs where the userId to be used for the Stick protocol
                                and the oneTimeId to be used for the Signal protocol.
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a1}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b1}
                            </SyntaxHighlighter>
                            <p className={s.p}>
                                All the private keys in the response are encrypted as explained in the{' '}
                                <Link to='/stick-protocol' className={s.link}>
                                    technical documentation
                                </Link>
                                . The response should then be uploaded to the server.
                            </p>
                            <p className={s.p}>
                                After completing the registration process, more prekeys can be generated in the
                                background or whenever needed, using the <i>generatePreKeys()</i> method.
                            </p>
                            <br />
                            <b className={s.p}>Parameters:</b>
                            <ul className={s.ul}>
                                <li className={s.li}>nextPreKeyId - int, id of the next prekey</li>
                                <li className={s.li}>count - int, number of prekeys to generate</li>
                            </ul>
                            <p className={s.p}>
                                <b>Return: </b>array of prekeys.
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a13}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b13}
                            </SyntaxHighlighter>
                        </div>

                        <div id='Creating-Sticky-Session'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Creating Sticky Session
                            </h2>
                            <p className={s.p}>To create a sticky session, simply call the following method.</p>
                            <b className={s.p}>Parameters:</b>
                            <ul className={s.ul}>
                                <li className={s.li}>userId - String</li>
                                <li className={s.li}>
                                    <Link className={s.link} to='/StickProtocol#creating'>
                                        stickId
                                    </Link>{' '}
                                    - String, the stickId of the sticky session
                                </li>
                            </ul>
                            <p className={s.p}>
                                <b>Return: </b>JSONObject (or dictionary) containing the following:
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>
                                    key - encrypted sender key (chainKey || private signature key || public signature
                                    key)
                                </li>
                                <li className={s.li}>id - int, the sender key id</li>
                            </ul>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a2}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b2}
                            </SyntaxHighlighter>
                            <p className={s.p}>The sender key should then be uploaded to the server.</p>
                        </div>

                        <div id='Creating-Pairwise-Session'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Creating Pairwise Session
                            </h2>
                            <p className={s.p}>Use the following method to create a signal pairwise session.</p>
                            <p className={s.p}>
                                <b>Parameters: </b>JSONObject that should contain the folloiwng:
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>userId - String</li>
                                <li className={s.li}>localId - int</li>
                                <li className={s.li}>identityKey (public) - base64 encoded String</li>
                                <li className={s.li}>signedPreKey (public) - base64 encoded String</li>
                                <li className={s.li}>signedPreKeyId - int</li>
                                <li className={s.li}>signature - String</li>
                                <li className={s.li}>preKey (public) - base64 encoded String</li>
                                <li className={s.li}>preKeyId - int</li>
                            </ul>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a3}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b3}
                            </SyntaxHighlighter>
                        </div>

                        <div id='Sharing-Sender-Keys'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Sharing Sender Keys
                            </h2>
                            <p className={s.p}>
                                After Alice has created a sticky session and initialized pairwise sessions with other
                                members of a party, she can encrypt her sticky session's sender key to them using the
                                following method (can also be used for standard group sessions).
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>senderId - String</li>
                                <li className={s.li}>targetId - String</li>
                                <li className={s.li}>stickId - String</li>
                                <li className={s.li}>
                                    isSticky - Boolean, indicates whether the sender key is for a sticky session or a
                                    standard group session
                                </li>
                            </ul>
                            <p className={s.p}>
                                <b>Return: </b>encrypted sender key - base64 String
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a4}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b4}
                            </SyntaxHighlighter>
                            <p className={s.p}>Alice can then upload the encrypted sender key(s) to the server.</p>
                        </div>

                        <div id='Encrypting'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Encrypting
                            </h2>
                            <p className={s.p}>
                                After Alice has shared her sender keys of a sticky session, she can start making
                                encryptions (post, comment, notification, etc.). Alice can make an encryption using the
                                following method.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>senderId - String, userId (or oneTimeId)</li>
                                <li className={s.li}>stickId - String, id of the sticky session</li>
                                <li className={s.li}>text - String, plaintext to be encrypted</li>
                                <li className={s.li}>
                                    isSticky - boolean indicating whether this encryption is for a sticky session or a
                                    standard group session
                                </li>
                            </ul>
                            <p className={s.p}>
                                <b>Return: </b>ciphertext - base64 String
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a5}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b5}
                            </SyntaxHighlighter>
                            <p className={s.p}>Alice can then share the encrypted data.</p>
                        </div>

                        <div id='Initializing-Sticky-Session-from-a-Shared-Sender-Key'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Initializing Sticky Session from a Shared Sender Key
                            </h2>
                            <p className={s.p}>
                                Before attempting to decrypt data, you need to check to check whether the corresponding
                                sticky session exists. This can be done using the <i>sessionExists()</i> method.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>senderId - String, id of the sender</li>
                                <li className={s.li}>stickId - String, id of the sticky session</li>
                            </ul>
                            <p className={s.p}>
                                <b>Return: </b>boolean
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a6}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b6}
                            </SyntaxHighlighter>
                            <p className={s.p}>
                                If the session exists you can proceed with decryption. Otherwise, you need to initialize
                                the sticky session first. The encrypted sender key needs to be fetched from the server.
                                After that, the you can initialize the session using the <i>initStickySession()</i>{' '}
                                method.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>senderId - String, userId of the sender</li>
                                <li className={s.li}>stickId - String, id of the sticky session</li>
                                <li className={s.li}>cipherSenderKey - String, encrypted sender key</li>
                                <li className={s.li}>
                                    identityKeyId - int, the identity key id of the target user that was used to encrypt
                                    the sender key
                                </li>
                            </ul>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a7}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b7}
                            </SyntaxHighlighter>
                            <p className={s.p}>
                                If the sender key has not been uploaded to the server yet, then mark the session as
                                pending.
                            </p>
                            <p className={s.p}>
                                If the sender key was for a Signal standard group session, then you can use the{' '}
                                <i>initStandardGroupSession()</i> method.
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a29}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b29}
                            </SyntaxHighlighter>
                        </div>
                        <div id='Decrypting'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Decrypting
                            </h2>
                            <p className={s.p}>
                                {' '}
                                After the receiver has successfully initialized the corresponding sticky session, they
                                can decrypt the encrypted data using the <i>decryptText()</i> method.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>senderId - String, userId of the sender</li>
                                <li className={s.li}>stickId - String, id of the sticky session</li>
                                <li className={s.li}>cipher - String, encrypted text</li>
                                <li className={s.li}>
                                    isSticky - boolean indicating whether this decryption is for a sticky session
                                </li>
                            </ul>
                            <p className={s.p}>
                                <b>Return: </b>plaintext string
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a8}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b8}
                            </SyntaxHighlighter>
                        </div>

                        <div id='Devices-Synchronization'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Devices Synchronization
                            </h2>
                            <p className={s.p}>
                                When a user is using multiple devices, the sticky session chains need to be kept in
                                sync. After every time the user uploads encrypted data, it needs to be updated on the
                                server at which step (sticky session lifecycle) is this chain at. Also, before they
                                encrypt data, they need to contact the server to know the current chain step of this
                                sticky session, and sync it accordingly. This can be done using the{' '}
                                <i>getChainStep()</i> and the <i>ratchetChain()</i> methods.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>userId</li>
                                <li className={s.li}>stickId - id of the sticky session</li>
                            </ul>
                            <p className={s.p}>
                                <b>Return: </b>the chain step - int
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a19}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b19}
                            </SyntaxHighlighter>

                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>userId</li>
                                <li className={s.li}>stickId - id of the sticky sesison</li>
                                <li className={s.li}>steps - int, number of steps</li>
                            </ul>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a20}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b20}
                            </SyntaxHighlighter>

                            <p className={s.p}>
                                When a user creates a sticky session <i>X</i> on <i>Device-A</i>, they would need to
                                re-initialize that session on <i>Device-B</i>. This can be done using the{' '}
                                <i>reinitMyStickySession()</i> method.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>userId - String</li>
                                <li className={s.li}>
                                    senderKey - JSONObject or Dictioinary that should contain the following:
                                </li>
                                <ul className={s.ul} style={{paddingTop: 0}}>
                                    <li className={s.li}>id - int, id of the key</li>
                                    <li className={s.li}>
                                        key - encrypted sender key (chainKey || signaturePrivateKey ||
                                        signaturePublicKey)
                                    </li>
                                    <li className={s.li}>stickId - String, id of the sticky session</li>
                                    <li className={s.li}>
                                        identityKeyId - int, id of the identity key used to encrypt the sender key
                                    </li>
                                    <li className={s.li}>step - represents the age of the sticky session</li>
                                </ul>
                            </ul>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a28}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b28}
                            </SyntaxHighlighter>
                        </div>

                        <div id='Files'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Files
                            </h2>
                            <p className={s.p}>
                                You can encrypt files in a sticky session using the <i>encryptFile()</i> method.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>senderId - String, userId of the sender</li>
                                <li className={s.li}>stickId - String, id of the sticky session</li>
                                <li className={s.li}>filePath - String, path of the file to be encrypted</li>
                                <li className={s.li}>
                                    isSticky - boolean indicating whether this encryption is for a sticky session
                                </li>
                            </ul>
                            <p className={s.p}>
                                <b>Return:</b> JSONObject or Dictionary containing the following:
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>uri - String, path of the encrypted file</li>
                                <li className={s.li}>cipher - String, the blob secret encrypted</li>
                            </ul>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a9}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b9}
                            </SyntaxHighlighter>

                            <p className={s.p}>
                                You can decrypt files in a sticky session using the <i>decryptFile()</i> method.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>senderId - String, userId of the sender</li>
                                <li className={s.li}>stickId - String, id of the sticky session</li>
                                <li className={s.li}>filePath - String, path of the encrypted file</li>
                                <li className={s.li}>cipher - String, the encrypted blob secret</li>
                                <li className={s.li}>outpath - String, path to decrypt the file at</li>
                                <li className={s.li}>
                                    isSticky - boolean indicating whether this encryption is for a sticky session
                                </li>
                            </ul>
                            <p className={s.p}>
                                <b>Return:</b> absolute path of the encrypted file.
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a10}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b10}
                            </SyntaxHighlighter>
                        </div>

                        <div id='Logging-In-And-Re-establishing-Sessions'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Logging In & Re-establishing Sessions
                            </h2>
                            <p className={s.p}>
                                When a user is logging in they need to decrypt their encrypted keys, and re-establish
                                their own sticky sessions. This can be done by calling the <i>reInitialize()</i> method
                                (preferably on a background thread).
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>
                                    bundle - JSONObject or Dictionary that should contain the following:
                                </li>
                                <ul className={s.ul} style={{paddingTop: 0}}>
                                    <li className={s.li}>An array of identity keys</li>
                                    <li className={s.li}>An array of signed prekeys</li>
                                    <li className={s.li}>An array of prekeys</li>
                                    <li className={s.li}>An array of sender keys (EncryptionSenderKeys)</li>
                                    <li className={s.li}>localId</li>
                                </ul>
                                <li className={s.li}>password - String, user's plaintext password</li>
                                <li className={s.li}>userId - String, user's unique id</li>
                                <li className={s.li}>
                                    progressEvent - An optional progress event to be implemented to provide progress
                                    feedback to the user while the keys are being decrypted.
                                </li>
                            </ul>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a11}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b11}
                            </SyntaxHighlighter>

                            <p className={s.p}>
                                To make the above method finish faster, you can decrypt a limited number of prekeys at
                                login, and then decrypt the rest of the prekeys in the background after completing the
                                login process, using the <i>decryptPreKeys()</i> method.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>an array of prekeys
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a12}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b12}
                            </SyntaxHighlighter>
                        </div>

                        <div id='Refresh-Keys'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Refresh Keys
                            </h2>
                            <p className={s.p}>
                                The identity key and the signed prekey of a user should refresh every while (every few
                                days or weeks). The time period is upto you, but the shorter the better. You can do so
                                using the <i>refreshSignedPreKey()</i> and the <i>refreshIdentityKey()</i> methods.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>keyAge - long or UInt64, the refresh period
                            </p>
                            <p className={s.p}>
                                <b>Return: </b>JSONObject or Dictionary containing the key
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a14}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b14}
                            </SyntaxHighlighter>
                        </div>

                        <div id='Initial-Password-Hash'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Initial Password Hash
                            </h2>
                            <p className={s.p}>
                                As explained in the{' '}
                                <Link to='/StickProtocol#password-security' className={s.link}>
                                    technical documentation
                                </Link>
                                , the Stick protocol uses double-hashing. So, whenever you need to verify a user's
                                password you first need to create the initial password hash on the user's device. This
                                can be done using the <i>createPasswordHash()</i> method.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>password - String, plaintext password</li>
                                <li className={s.li}>
                                    salt - String, the salt that was used to create the initial password hash at
                                    registration time
                                </li>
                            </ul>
                            <p className={s.p}>
                                <b>Return: </b>initial password hash - base64 String
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a15}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b15}
                            </SyntaxHighlighter>
                        </div>

                        <div id='Changing-Password'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Changing Password
                            </h2>
                            <p className={s.p}>
                                When you need to change a user's password, you need to reEncrypt the user's identity
                                keys, signed prekeys and prekeys. This can be done using the <i>reEncryptKeys()</i>{' '}
                                method.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>
                            </p>
                            <ul className={s.ul}>
                                <li className={s.li}>password - String, plaintext password</li>
                                <li className={s.li}>
                                    progressEvent - An optional progress event to be implemented to provide progress
                                    feedback to the user while the keys are being encrypted.
                                </li>
                            </ul>
                            <p className={s.p}>
                                <b>Return: </b>JSONObject or Dictionary containing an array of identity keys, an array
                                of signed prekeys and an array of prekeys
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a16}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b16}
                            </SyntaxHighlighter>
                            <p className={s.p}>
                                Also, you would need to update the double-hashed password. So you need to create a new
                                initial password hash. This can be done using the <i>createNewPasswordHash()</i> method.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>password - String, plaintext password
                            </p>
                            <p className={s.p}>
                                <b>Return: </b>JSONObject or Dictionary containing hash and salt
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a17}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b17}
                            </SyntaxHighlighter>
                        </div>

                        <div id='Recovering-Password'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Recovering Password
                            </h2>
                            <p className={s.p}>
                                If the user forgets their password, it can be recovered using the{' '}
                                <i>recoverPassword()</i> method which employs Keychain API on iOS and KeyStore API on
                                Android. Worth noting that KeyStore lacks data persistence, so it is recommended to use
                                the alternate solution explained{' '}
                                <Link className={s.link} to='/StickProtocol#storing-passwords'>
                                    here
                                </Link>{' '}
                                to store the user's password persistently.
                            </p>
                            <p className={s.p}>
                                <b>Parameters: </b>userId - String
                            </p>
                            <p className={s.p}>
                                <b>Return: </b>plaintext password - String
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a18}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b18}
                            </SyntaxHighlighter>
                        </div>

                        <div id='Signal-Pairwise-Session-Methods'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Signal Pairwise Session Methods
                            </h2>
                            <p className={s.p}>
                                The following pairwise session methods are available (in addition to the{' '}
                                <i>initPairwiseSession()</i> method mentioned previously).
                            </p>

                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a23}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b23}
                            </SyntaxHighlighter>
                            <br />
                            <br />
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a24}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b24}
                            </SyntaxHighlighter>
                            <br />
                            <br />
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a25}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b25}
                            </SyntaxHighlighter>
                            <p className={s.p}>
                                <i>isStickyKey</i> is a boolean indicating whether this ciphertext is an encrypted
                                sender key or a normal message.
                            </p>

                            <br />
                            <br />
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a26}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b26}
                            </SyntaxHighlighter>

                            <br />
                            <br />
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a27}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b27}
                            </SyntaxHighlighter>
                        </div>

                        <div id='Utility-Methods'>
                            <h2 className={s.h2} style={{paddingTop: '3vh'}}>
                                Utility Methods
                            </h2>
                            <p className={s.p}>
                                You can check if the user has successfully completed the initialization method at
                                registration time using the <i>isInitialized()</i> method.
                            </p>
                            <p className={s.p}>
                                <b>Return: </b>boolean
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a21}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b21}
                            </SyntaxHighlighter>

                            <p className={s.p}>
                                When a users logs out, you can reset the key stores using the <i>resetDatabase()</i>{' '}
                                method.
                            </p>
                            <SyntaxHighlighter wrapLongLines language='java' style={docco} customStyle={andStyle}>
                                {a22}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter wrapLongLines language='swift' style={docco} customStyle={iosStyle}>
                                {b22}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SPUsageScreen;

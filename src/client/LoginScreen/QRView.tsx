import React from 'react';
import QRCode from 'react-qr-code';
import s from './style.css';

const QRView: React.FC = () => {
    return (
        <div className={s.formContainer}>
            <p className={s.qrInfo}>
                Download <span style={{fontFamily: 'Sirin Stencil'}}>Sticknet</span> app on your mobile device to create
                an account. Scan the QR code below, or get it from the App store.
            </p>
            <QRCode value={`${window.location.origin}/qr-redirect`} style={{marginTop: '28px'}} />
            <div className={s.storeContainer}>
                <a
                    href='https://apps.apple.com/app/sticknet-encrypted-platform/id1576169188'
                    target='_blank'
                    rel='noreferrer'>
                    <img
                        src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/app-store.svg?alt=media&token=b6a7ec90-2fe1-49ed-b402-d908eca2d8f2'
                        className={s.store}
                        alt='App Store'
                    />
                </a>
                <a href='https://play.google.com/store/apps/details?id=com.stiiick' target='_blank' rel='noreferrer'>
                    <img
                        src='https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/google-play.svg?alt=media&token=8a8cc265-190a-4eec-a290-0ca6f1f1bd10'
                        className={s.store}
                        alt='Google Play'
                    />
                </a>
            </div>
        </div>
    );
};

export default QRView;

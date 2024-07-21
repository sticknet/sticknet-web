import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const QRRedirect: React.FC = () => {
    const history = useHistory();

    useEffect(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
            window.location.href = 'https://apps.apple.com/app/sticknet-encrypted-platform/id1576169188';
        } else {
            window.location.href = 'https://play.google.com/store/apps/details?id=com.stiiick';
        }
        history.push('/');
    }, []);

    return <div />;
};

export default QRRedirect;

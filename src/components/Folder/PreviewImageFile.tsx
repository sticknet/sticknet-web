import React, {useEffect, useState, FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {PiImageThin} from 'react-icons/pi';
import {app} from '../../actions';
import s from './style.css';
import {IApplicationState, TFile} from '../../types';

interface PreviewImageFileProps {
    file: TFile;
}

const PreviewImageFile: FC<Props> = ({file, uri, downloading, cacheVaultFile}) => {
    const [retried, setRetried] = useState(false);

    useEffect(() => {
        if (!uri) {
            cacheVaultFile({file, isPreview: true});
        }
    }, []);

    const handleError = () => {
        if (retried) return;
        setRetried(true);
        cacheVaultFile({file, isPreview: true});
    };

    return uri && !downloading ? (
        <img src={uri} className={s.imageFile} onError={handleError} />
    ) : (
        <PiImageThin size={80} className={s.placeholder} />
    );
};

const mapStateToProps = (state: IApplicationState, ownProps: {file: TFile}) => ({
    uri: state.vaultCache[ownProps.file.previewUriKey] ? state.vaultCache[ownProps.file.previewUriKey].uri : null,
    downloading: state.download[ownProps.file.previewUriKey],
});

const connector = connect(mapStateToProps, {...app});

type Props = ConnectedProps<typeof connector> & PreviewImageFileProps;

export default connector(PreviewImageFile);

import React, {useEffect, useState, FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import s from './style.css';
import CircleProgress from '../CircleProgress';
import {app} from '../../actions';
import {IApplicationState, TFile} from '../../types';

interface ImageFileProps {
    file: TFile;
    handleContextMenu: (e: any) => void;
}

type Props = ConnectedProps<typeof connector> & ImageFileProps;

const ImageFile: FC<Props> = (props) => {
    const VideoView: FC<{file: TFile; uri: string}> = ({file, uri}) => {
        const width =
            file.width > file.height ? window.outerWidth * 0.5 : (file.width * window.innerHeight) / file.height;
        const height =
            file.width > file.height ? (file.height * (window.outerWidth * 0.5)) / file.width : window.innerHeight;
        return (
            <video onError={handleError} controls autoPlay width={width} height={height}>
                <source src={uri} type='video/mp4' />
                <track kind='captions' />
            </video>
        );
    };
    const [retried, setRetried] = useState(false);

    useEffect(() => {
        if (
            !props.uri ||
            (!props.file.isPhoto && !props.fileTempLoaded) ||
            (props.file.type.includes('heic') && !props.heicUri)
        ) {
            props.cacheVaultFile({file: props.file});
        }
    }, []);

    useEffect(() => {
        setRetried(false);
        if (!props.uri || (!props.file.isPhoto && !props.fileTempLoaded)) {
            props.cacheVaultFile({file: props.file});
        }
    }, [props.currentIndex]);

    const handleError = () => {
        if (retried) return;
        setRetried(true);
        props.cacheVaultFile({file: props.file});
    };

    const {file} = props;
    return (
        <div className={s.container}>
            {!file.isPhoto && props.uri && props.fileTempLoaded ? (
                <iframe
                    onError={handleError}
                    src={props.uri}
                    style={{background: '#ffffff'}}
                    width='1200'
                    height={window.innerHeight}
                    title={`iframe-${file.uriKey}`}
                />
            ) : file.type.startsWith('video') && props.uri && !props.downloadProgress ? (
                <VideoView file={file} uri={props.uri} />
            ) : file.type.startsWith('image') ? (
                <img
                    src={
                        props.uri && !props.downloadProgress
                            ? props.file.type.toLowerCase().includes('heic')
                                ? (props.heicUri as string)
                                : props.uri
                            : (props.previewUri as string)
                    }
                    className={s.imageFile}
                    onError={handleError}
                    onContextMenu={props.handleContextMenu}
                />
            ) : null}
            {props.downloadProgress ? (
                <div className={s.progressContainer}>
                    {props.heicProcessing ? (
                        <p className={s.processing}>PROCESSING...</p>
                    ) : (
                        <CircleProgress progress={props.downloadProgress} size={80} strokeWidth={3} opacity={0.7} />
                    )}
                </div>
            ) : null}
        </div>
    );
};

const mapStateToProps = (state: IApplicationState, ownProps: {file: TFile}) => ({
    uri: state.vaultCache[ownProps.file.uriKey] ? state.vaultCache[ownProps.file.uriKey].uri : null,
    heicUri: state.vaultCache[`${ownProps.file.uriKey}-heic`]
        ? state.vaultCache[`${ownProps.file.uriKey}-heic`].uri
        : null,
    previewUri: state.vaultCache[ownProps.file.previewUriKey]
        ? state.vaultCache[ownProps.file.previewUriKey].uri
        : null,
    downloadProgress: state.download[ownProps.file.uriKey] ? state.download[ownProps.file.uriKey] : null,
    heicProcessing: state.heic[ownProps.file.uriKey],
    fileTempLoaded: state.appTemp.fileTempLoaded[ownProps.file.uriKey],
    currentIndex: state.appTemp.fileView.index,
});

const connector = connect(mapStateToProps, {...app});

export default connector(ImageFile);

import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {MdCheckCircle} from 'react-icons/md';
import s from './style.css';
import CircleProgress from '../CircleProgress';
import FileLabel from '../FileLabel';
import {IApplicationState, TFile} from '../../types';

interface OwnProps {
    file: TFile;
}
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = OwnProps & PropsFromRedux;

const UploadItem: React.FC<Props> = (props) => {
    const {file, progress, uri} = props;

    return (
        <div className={s.itemContainer}>
            <div className={s.infoContainer}>
                {file.isPhoto ? (
                    <img src={uri as string} className={s.img} style={{opacity: progress === 1 ? 1 : 0.5}} />
                ) : (
                    <FileLabel file={file} small />
                )}
                <p className={s.fileName}>{file.name}</p>
            </div>
            {progress === 1 ? (
                <MdCheckCircle size={24} className={s.checkCircle} />
            ) : (
                <CircleProgress progress={progress} size={24} strokeWidth={3} />
            )}
        </div>
    );
};

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps) => ({
    uri: state.vaultCache[ownProps.file.previewUriKey] ? state.vaultCache[ownProps.file.previewUriKey].uri : null,
    progress: state.upload[ownProps.file.uriKey],
});

const connector = connect(mapStateToProps);

export default connector(UploadItem);

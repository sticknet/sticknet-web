import React, {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import s from './style.css';
import {vault} from '../../actions';
import {IApplicationState} from '../../types';

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const MovingFileView: FC<Props> = (props) => {
    if (!props.file) return null;
    return (
        <div className={s.container}>
            <p>
                Moving <b>{props.file.name}</b>
            </p>
            <p>Go to your destination folder and confirm</p>
            <div className={s.buttonsContainer}>
                <button type='button' className={`${s.button} ${s.cancel}`} onClick={props.cancelMovingFile}>
                    Cancel
                </button>
                <button
                    type='submit'
                    className={`${s.button} ${s.confirm}`}
                    onClick={() => {
                        if (props.file?.folder === props.currentFolder.id) {
                            alert('Cannot move file to the same folder');
                            return;
                        }
                        props.moveFile(props.file, props.currentFolder);
                    }}>
                    Confirm
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    file: state.appTemp.movingFile,
    currentFolder: state.appTemp.folderStack[state.appTemp.folderStack.length - 1],
});

const connector = connect(mapStateToProps, {...vault});

export default connector(MovingFileView);

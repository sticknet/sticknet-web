import React, {useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {IoIosArrowDown, IoIosArrowUp, IoIosClose} from 'react-icons/io';
import s from './style.css';
import UploadItem from './UploadItem';
import {vault} from '../../actions';
import {IApplicationState, TFile} from '../../types';

const UploadMenu: React.FC<Props> = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    if (!props.showMenu) return null;
    const Arrow = collapsed ? IoIosArrowUp : IoIosArrowDown;
    const {uploadingCount, uploadedCount} = props;
    const title =
        uploadingCount! > 0
            ? `Uploading ${uploadingCount} item${uploadingCount! > 1 ? 's' : ''}`
            : `${uploadedCount} upload${uploadedCount > 1 ? 's' : ''} complete`;
    return (
        <div className={s.container}>
            <div className={s.titleContainer}>
                <p className={s.title}>{title}</p>
                <div className={s.buttonsContainer}>
                    <Arrow fontSize={20} onClick={() => setCollapsed(!collapsed)} className={s.button} />
                    <IoIosClose
                        fontSize={28}
                        style={{marginLeft: '6px'}}
                        className={s.button}
                        onClick={() => props.hideUploadMenu()}
                    />
                </div>
            </div>
            <div
                className={s.itemsContainer}
                style={{maxHeight: collapsed ? 0 : 200, paddingBottom: collapsed ? 0 : 10}}>
                {props.files.map((file: TFile) => (
                    <UploadItem file={file} key={file.uriKey} />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => {
    const {showMenu, files, ...uploadData} = state.upload;
    let uploadedCount = 0;
    Object.values(uploadData).forEach((value) => {
        if (value === 1) uploadedCount += 1;
    });
    return {
        showMenu,
        files,
        uploadingCount: state.upload.count,
        uploadedCount,
    };
};

const connector = connect(mapStateToProps, {...vault});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export default connector(UploadMenu);

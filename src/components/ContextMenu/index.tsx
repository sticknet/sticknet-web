import React, {useState, useEffect} from 'react';
import {BsPencil, BsDownload} from 'react-icons/bs';
import {IoMdCopy} from 'react-icons/io';
import {FiTrash} from 'react-icons/fi';
import {MdOutlineDriveFileMove} from 'react-icons/md';
import {connect, ConnectedProps} from 'react-redux';
import s from './style.css';
import {vault, app} from '../../actions';
import {InputModal} from '../index';
import SettingsItem from '../SettingsItem';
import {formatBytes} from '../../utils';
import {IApplicationState, TFile, TVaultNote} from '../../types';
import type {SettingItem} from '../ProfileMenu/SettingsMenu';

interface ContextMenuProps {
    x: number;
    y: number;
    onItemClick: () => void;
    item: TFile | TVaultNote;
    type: 'file' | 'note';
    inFileView?: boolean;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ContextMenuProps & PropsFromRedux;

const ContextMenu: React.FC<Props> = (props) => {
    const {x, y, onItemClick, item, type} = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [fileName, setFileName] = useState((item as TFile).name);

    useEffect(() => {
        if (props.renaming && props.renaming.uriKey === (props.item as TFile).uriKey) {
            setModalVisible(true);
        }
    }, [props.renaming]);

    const executeDownload = (givenUri?: string) => {
        const a = document.createElement('a');
        a.href = givenUri || props.uri!;
        a.download = (item as TFile).name.replace(/\s+\S*$/, '');
        a.click();
    };

    const downloadFile = async () => {
        if ('isPhoto' in item && item.isPhoto) {
            const testImage = new Image();
            testImage.src = props.heicUri || props.uri!;
            testImage.onerror = function () {
                props.cacheVaultFile({file: item, isPreview: false, callback: executeDownload});
            };
            testImage.onload = function () {
                executeDownload();
            };
        } else {
            props.cacheVaultFile({file: item as TFile, isPreview: false, callback: executeDownload});
        }
    };

    let fileActions: SettingItem[] = [
        {
            text: 'Rename',
            icon: <BsPencil color='#0F0F28' />,
            onClick: () => {
                props.renamingFile(props.item);
            },
        },
        {
            text: 'Move',
            icon: <MdOutlineDriveFileMove color='#0F0F28' />,
            onClick: () => {
                props.movingFile(props.item);
                onItemClick();
            },
        },
        {
            text: 'Download',
            icon: <BsDownload color='#0F0F28' />,
            onClick: () => {
                downloadFile();
                onItemClick();
            },
        },
    ];

    if (props.inFileView) {
        fileActions = fileActions.filter((action) => action.text !== 'Move');
    }

    if ('isFolder' in props.item && props.item.isFolder) {
        fileActions = fileActions.filter((action) => action.text !== 'Download');
    }

    const noteActions: SettingItem[] = [
        {
            text: 'Copy',
            icon: <IoMdCopy color='#0F0F28' />,
            onClick: () => {
                navigator.clipboard.writeText((item as TVaultNote).text);
                onItemClick();
            },
        },
    ];

    const commonActions: SettingItem[] = [
        {
            text: 'Delete',
            danger: true,
            icon: <FiTrash color='red' />,
            onClick: () => {
                const confirmed = window.confirm(`Are you sure you want to delete this ${type}?`);
                if (confirmed) props.deleteItem(item, type);
                onItemClick();
            },
        },
    ];

    let actions: SettingItem[];
    if (type === 'file') {
        actions = fileActions;
    } else {
        actions = noteActions;
    }

    actions = actions.concat(commonActions);

    return (
        <div className={s.menuContainer} style={{top: y, left: x}}>
            <InputModal
                value={fileName}
                visible={modalVisible}
                setVisible={setModalVisible}
                title='Renaming File'
                doneText='Rename'
                onChange={(e) => setFileName(e.target.value)}
                cancel={() => props.cancelRenaming()}
                done={() => {
                    if (fileName.length === 0) {
                        alert("File name can't be empty");
                    } else {
                        props.cancelRenaming();
                        setModalVisible(false);
                        if (fileName !== (item as TFile).name) {
                            props.renameFile(props.item, fileName);
                        }
                        onItemClick();
                    }
                }}
            />
            {type === 'file' && (
                <div className={s.titleContainer}>
                    <p className={s.name}>{(props.item as TFile).name}</p>
                    {'isFolder' in props.item || (
                        <p className={s.fileSize}>{formatBytes((props.item as TFile).fileSize)}</p>
                    )}
                </div>
            )}
            {actions.map((action) => (
                <SettingsItem
                    key={action.text}
                    icon={action.icon}
                    text={action.text}
                    onClick={action.onClick}
                    danger={action.danger}
                />
            ))}
        </div>
    );
};

const mapStateToProps = (state: IApplicationState, ownProps: ContextMenuProps) => {
    return {
        currentFolder: state.appTemp.folderStack[state.appTemp.folderStack.length - 1],
        uri: state.vaultCache[(ownProps.item as TFile).uriKey]
            ? state.vaultCache[(ownProps.item as TFile).uriKey].uri
            : null,
        heicUri: state.vaultCache[`${(ownProps.item as TFile).uriKey}-heic`]
            ? state.vaultCache[`${(ownProps.item as TFile).uriKey}-heic`].uri
            : null,
        renaming: state.appTemp.renamingFile,
    };
};

const connector = connect(mapStateToProps, {...vault, ...app});

export default connector(ContextMenu);

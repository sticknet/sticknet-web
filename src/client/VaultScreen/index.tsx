import React, {useEffect, useState, ChangeEvent, MouseEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {MdOutlineDriveFolderUpload} from 'react-icons/md';
import {AiOutlineFolderAdd} from 'react-icons/ai';
import {CiStickyNote} from 'react-icons/ci';
import {RiArrowRightSLine, RiArrowLeftSLine} from 'react-icons/ri';
import {TbFileUpload} from 'react-icons/tb';
import {useHistory} from 'react-router-dom';

import {ActionButton, Folder, InputModal, MovingFileView, UploadMenu} from '../../components';
import s from './style.css';
import gs from '../../global.css';
import {vault, auth} from '../../actions';
import {createFileSections, isCloseToBottom} from '../../utils';
import FileView from '../FileView';
import ContextMenu from '../../components/ContextMenu';
import {IApplicationState, TFile} from '../../types';

let loadingMore = false;

type PropsFromRedux = ConnectedProps<typeof connector>;
type VaultScreenProps = PropsFromRedux;

const VaultScreen: React.FC<VaultScreenProps> = (props) => {
    const history = useHistory();
    const handleScroll = () => {
        if (isCloseToBottom() && !loadingMore && props.url) {
            loadingMore = true;
            if (props.isSearching) props.searchItems(props.searchUrl as string, false);
            else
                props.fetchFiles({
                    currentUrl: props.url,
                    folderId: props.currentFolder.id,
                    firstFetch: false,
                    refresh: false,
                    callback: () => (loadingMore = false),
                });
        }
    };

    useEffect(() => {
        if (!props.user || !props.isAuthenticated) {
            props.logout(() => history.push('/portal-login'));
            return;
        }
        const parts = window.location.pathname
            ?.split('/')
            .filter((item) => item !== '')
            .slice(2);
        if (!props.fetched && parts.length === 0) {
            props.fetchLatestFiles(() =>
                props.fetchFiles({currentUrl: props.url, folderId: 'home', firstFetch: false, refresh: true}),
            );
        }
        props.goToFolder(parts);
        props.refreshUser();
    }, []);

    useEffect(() => {
        const unlisten = history.listen((location, action) => {
            if (action === 'POP') {
                if (props.fileViewVisible) props.hideFileView();
                else props.closeFolder();
            }
        });
        return () => {
            unlisten();
        };
    }, [props.fileViewVisible]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [props.url]);

    const [highlighted, setHighlighted] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [folderName, setFolderName] = useState('');

    const SectionTitle: React.FC<any> = ({section}) => {
        return (
            <div className={s.sectionTitleContainer}>
                <p className={s.sectionTitle}>{section.title}</p>
                {section.title !== 'Recent' && (
                    <p className={s.sectionCount}>
                        {section.data.length} item{section.data.length > 1 ? 's' : ''}
                    </p>
                )}
            </div>
        );
    };

    const handleUploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const folderId = props.currentFolder.id !== 'search' ? props.currentFolder.id : 'home';
        props.uploadFiles(Array.from(e.target.files || []), props.isBasic, folderId);
    };

    const handleUploadFolder = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const folderName = e.target.files?.[0]?.webkitRelativePath?.split('/')[0];
        if (folderName) {
            props.createFolder(props.currentFolder.id, folderName, (folderId) =>
                props.uploadFiles(Array.from(e.target.files || []), props.isBasic, folderId),
            );
        }
    };

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});
    const [contextItem, setContextItem] = useState<TFile | null>(null);

    const handleMenuItemClick = () => {
        setContextMenuVisible(false);
    };

    const handleContextMenu = (e: MouseEvent<HTMLDivElement>, item: TFile) => {
        e.preventDefault();
        if (item.folderType === 'camera_uploads') return;
        setContextMenuVisible(true);
        setContextMenuPosition({x: e.pageX + 10, y: e.pageY});
        setContextItem(item);
    };

    const handleEmptyClick = () => {
        setHighlighted(null);
        setContextMenuVisible(false);
    };

    const {currentFolder} = props;

    return (
        <div
            className={s.main}
            id='main'
            onClick={handleEmptyClick}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleEmptyClick();
            }}>
            {contextMenuVisible && (
                <ContextMenu
                    x={contextMenuPosition.x}
                    y={contextMenuPosition.y}
                    onItemClick={handleMenuItemClick}
                    item={contextItem as TFile}
                    type='file'
                />
            )}
            <InputModal
                visible={modalVisible}
                setVisible={setModalVisible}
                title='New Folder'
                doneText='Create'
                onChange={(e) => setFolderName(e.target.value)}
                done={() => {
                    props.createFolder(props.currentFolder.id, folderName);
                    setModalVisible(false);
                }}
            />
            <UploadMenu />
            <FileView />
            <MovingFileView />
            <div className={s.screenContainer}>
                <div className={s.stackContainer}>
                    {props.folderStack.map((item, index) => {
                        const color = currentFolder.name === item.name ? gs.blackColor : gs.greyColor;
                        return (
                            <div className={s.stackItem} key={item.id}>
                                <button
                                    type='button'
                                    onClick={() => {
                                        if (!props.fetchedFolders[item.id])
                                            props.fetchFiles({folderId: item.id, firstFetch: false, refresh: true});
                                        props.setFolder(item.id);
                                    }}
                                    className={`${s.stackItemTitle} ${color}`}>
                                    {props.isSearching && <RiArrowLeftSLine fontSize={20} className={gs.greyColor} />}
                                    {item.name === 'home' ? 'Vault' : item.name}
                                </button>
                                {index < props.folderStack.length - 1 && (
                                    <span style={{marginLeft: '10px', marginRight: '10px'}}>
                                        <RiArrowRightSLine fontSize={20} className={gs.greyColor} />
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
                {props.isSearching && <p className={s.resultsTitle}>Search results</p>}
                <div style={{flexDirection: 'row', display: 'flex'}}>
                    <ActionButton htmlFor='upload' text='Upload files' icon={<TbFileUpload fontSize={20} />} />
                    <ActionButton
                        htmlFor='upload-folder'
                        text='Upload folder'
                        icon={<MdOutlineDriveFolderUpload fontSize={20} />}
                        style={{marginLeft: 12}}
                    />
                    <ActionButton
                        onClick={() => setModalVisible(true)}
                        text='Create folder'
                        icon={<AiOutlineFolderAdd fontSize={20} />}
                        style={{marginLeft: 12}}
                    />
                    <ActionButton
                        onClick={() => history.push('/vault/notes/create-note')}
                        text='New note'
                        icon={<CiStickyNote fontSize={20} />}
                        style={{marginLeft: 12}}
                    />
                </div>
                <input type='file' multiple id='upload' style={{display: 'none'}} onChange={handleUploadFiles} />
                <input
                    type='file'
                    // @ts-ignore
                    // eslint-disable-next-line react/no-unknown-property
                    directory=''
                    webkitdirectory=''
                    // @ts-ignore
                    // eslint-disable-next-line react/no-unknown-property
                    moxdirectory=''
                    multiple
                    id='upload-folder'
                    style={{display: 'none'}}
                    onChange={handleUploadFolder}
                />
                {props.files.length > 0 ? (
                    props.files.map((section: {title: React.Key; data: TFile[]}) => (
                        <div style={{marginTop: '2vh'}} key={section.title}>
                            <SectionTitle section={section} />
                            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                                {section.data.map((item: TFile, index: number) => (
                                    <Folder
                                        item={item}
                                        index={index}
                                        key={`${item.name}${index}`}
                                        highlighted={highlighted}
                                        setHighlighted={(id) => setHighlighted(id)}
                                        handleContextMenu={(e: any) => handleContextMenu(e, item)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : props.fetched ? (
                    <p className={s.emptyText}>This folder is empty</p>
                ) : (
                    <p className={s.emptyText}>
                        {props.isSearching && props.emptySearch ? 'No results found' : 'Loading...'}
                    </p>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => {
    const isSearching = state.appTemp.isSearching;
    const currentFolder = isSearching
        ? {id: 'search', name: ''}
        : state.appTemp.folderStack[state.appTemp.folderStack.length - 1];
    let lastFolderName =
        state.appTemp.folderStack.length === 1
            ? 'home'
            : state.appTemp.folderStack[state.appTemp.folderStack.length - 2].name;
    if (lastFolderName === 'home') lastFolderName = 'Vault';
    const mostRecent = currentFolder.id === 'home' ? state.filesTree.mostRecent : null;
    return {
        isSearching,
        emptySearch: state.appTemp.emptySearch,
        files: createFileSections(state.filesTree[currentFolder.id] || [], mostRecent, state.files),
        fetched: state.fetched.folders[currentFolder.id],
        fetchedFolders: state.fetched.folders,
        currentFolder,
        lastFolderName,
        folderStack: state.appTemp.folderStack,
        downloadProgress: state.download,
        url: state.url.filesUrls[currentFolder.id],
        searchUrl: state.url.searchUrl,
        fileViewVisible: state.appTemp.fileView.visible,
        isBasic: !state.auth.user || state.auth.user.subscription === 'basic',
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const connector = connect(mapStateToProps, {...vault, ...auth});

export default connector(VaultScreen);

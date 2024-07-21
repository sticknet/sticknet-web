import React, {useEffect, useState, ChangeEvent, MouseEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {MdOutlineAddPhotoAlternate} from 'react-icons/md';
import {FaPhotoVideo} from 'react-icons/fa';
import {ActionButton, Folder, UploadMenu, EmptyContent} from '../../components';
import s from './style.css';
import {vault} from '../../actions';
import FileView from '../FileView';
import {isCloseToBottom} from '../../utils';
import ContextMenu from '../../components/ContextMenu';
import {IApplicationState, TFile} from '../../types';

let loadingMore = false;

type PropsFromRedux = ConnectedProps<typeof connector>;
type PhotosScreenProps = PropsFromRedux;

const PhotosScreen: React.FC<PhotosScreenProps> = (props) => {
    useEffect(() => {
        if (!props.fetched) props.fetchPhotos(props.url, 'recents', true, true);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [props.url]);

    const handleScroll = () => {
        if (isCloseToBottom() && !loadingMore && props.url) {
            loadingMore = true;
            props.fetchPhotos(props.url, 'recents', false, false, () => (loadingMore = false));
        }
    };

    const [highlighted, setHighlighted] = useState<number | null>(null);

    const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            props.uploadFiles(Array.from(e.target.files), props.isBasic, null, true);
        }
    };

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});
    const [contextItem, setContextItem] = useState<TFile | null>(null);

    const handleMenuItemClick = () => {
        setContextMenuVisible(false);
    };

    const handleCloseContextMenu = () => {
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
                    inFileView
                />
            )}
            <UploadMenu />
            <FileView />
            <div className={s.screenContainer}>
                <div className={s.stackContainer}>
                    <div className={s.stackItem}>
                        <button type='button' className={s.stackItemTitle}>
                            Photos
                        </button>
                    </div>
                </div>
                <div style={{flexDirection: 'row', display: 'flex'}}>
                    <ActionButton
                        htmlFor='upload'
                        text='Upload photos'
                        icon={<MdOutlineAddPhotoAlternate fontSize={20} />}
                    />
                </div>
                <input
                    type='file'
                    accept='image/*'
                    multiple
                    id='upload'
                    style={{display: 'none'}}
                    onChange={handlePhotoChange}
                />
                {props.photos.length > 0 ? (
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        {props.photos.map((item, index) => (
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
                ) : (
                    <EmptyContent
                        icon={<FaPhotoVideo size={100} color='lightgrey' />}
                        text="Your memory vault is empty, but it won't be for long. Begin by adding your first photo."
                        action={
                            <ActionButton
                                htmlFor='upload'
                                text='Upload photos'
                                icon={<MdOutlineAddPhotoAlternate fontSize={20} />}
                                style={{alignSelf: 'center', marginBottom: 20}}
                            />
                        }
                    />
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => {
    const currentAlbum = state.appTemp.albumStack[state.appTemp.albumStack.length - 1];
    let lastAlbumName =
        state.appTemp.albumStack.length === 1
            ? 'home'
            : state.appTemp.albumStack[state.appTemp.albumStack.length - 2].name;
    if (lastAlbumName === 'home') lastAlbumName = 'Albums';
    return {
        photos: Object.values(state.photos[currentAlbum.id] || {}),
        fetched: state.fetched.vaultAlbums.recents,
        currentAlbum,
        lastAlbumName,
        albums: Object.values(state.vaultAlbums),
        atHome: state.appTemp.albumStack.length === 1,
        url: state.url.photosUrls[currentAlbum.id],
        isBasic: state.auth.user?.subscription === 'basic',
    };
};

const connector = connect(mapStateToProps, {...vault});

export default connector(PhotosScreen);

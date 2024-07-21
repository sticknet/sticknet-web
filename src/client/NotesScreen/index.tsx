import React, {useEffect, useState, ChangeEvent, MouseEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {CiStickyNote} from 'react-icons/ci';
import {MdOutlineNotes} from 'react-icons/md';
import {ActionButton, EmptyContent, VaultNote} from '../../components';
import s from './style.css';
import {vault} from '../../actions';
import ContextMenu from '../../components/ContextMenu';
import {API} from '../../actions/URL';
import {isCloseToBottom} from '../../utils';
import {IApplicationState, TVaultNote} from '../../types';

let loadingMore = false;

type PropsFromRedux = ConnectedProps<typeof connector>;

type NotesScreenProps = PropsFromRedux;

const NotesScreen: React.FC<NotesScreenProps> = (props) => {
    useEffect(() => {
        props.fetchVaultNotes(`${API}/api/fetch-vault-notes/`, true);
    }, []);

    const handleScroll = () => {
        if (isCloseToBottom() && !loadingMore && props.url) {
            loadingMore = true;
            props.fetchVaultNotes(props.url, false, () => (loadingMore = false));
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [props.url]);

    const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            props.uploadFiles(Array.from(e.target.files), props.isBasic, props.currentFolder.id);
        }
    };

    const history = useHistory();

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});
    const [contextItem, setContextItem] = useState<TVaultNote | null>(null);

    const handleMenuItemClick = () => {
        setContextMenuVisible(false);
    };

    const handleContextMenu = (
        e: MouseEvent<HTMLDivElement> | MouseEvent<SVGElement>,
        isDotClick: boolean,
        item: TVaultNote,
    ) => {
        e.preventDefault();
        setContextMenuVisible(true);
        setContextMenuPosition({x: isDotClick ? e.pageX - 310 : e.pageX + 10, y: e.pageY});
        setContextItem(item);
    };

    const handleEmptyClick = () => {
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
                    item={contextItem as TVaultNote}
                    type='note'
                />
            )}
            <div className={s.screenContainer}>
                <div className={s.stackContainer}>
                    <div className={s.stackItem}>
                        <button type='button' className={s.stackItemTitle}>
                            Notes
                        </button>
                    </div>
                </div>
                <div style={{flexDirection: 'row', display: 'flex'}}>
                    <ActionButton
                        onClick={() => history.push('/vault/notes/create-note')}
                        text='New note'
                        icon={<CiStickyNote fontSize={20} />}
                    />
                </div>
                <input type='file' multiple id='upload' style={{display: 'none'}} onChange={handlePhotoChange} />
                {props.notes.length > 0 ? (
                    <div style={{display: 'flex', flexDirection: 'column', paddingBottom: '20px', paddingRight: '2px'}}>
                        {props.notes.map((item, index) => (
                            <VaultNote
                                note={item}
                                key={`${index}`}
                                handleContextMenu={(e, isDotClick) => handleContextMenu(e, isDotClick as boolean, item)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyContent
                        icon={<MdOutlineNotes size={100} color='lightgrey' />}
                        text='Secret notes, hidden treasures, all secured in your private Vault.'
                        action={
                            <ActionButton
                                onClick={() => history.push('/vault/notes/create-note')}
                                text='New note'
                                icon={<CiStickyNote fontSize={20} />}
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
    const currentFolder = state.appTemp.isSearching
        ? {id: 'search'}
        : state.appTemp.folderStack[state.appTemp.folderStack.length - 1];
    return {
        notes: Object.values(state.vaultNotes),
        url: state.url.vaultNotesUrl,
        isBasic: state.auth.user?.subscription === 'basic',
        currentFolder,
    };
};

const connector = connect(mapStateToProps, {...vault});

export default connector(NotesScreen);

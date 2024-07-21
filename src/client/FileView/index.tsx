import React, {useEffect, useState, MouseEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {IoClose} from 'react-icons/io5';
import s from './style.css';
import {FileViewItem} from '../../components';
import {vault} from '../../actions';
import {createFilesList} from '../../utils';
import ContextMenu from '../../components/ContextMenu';
import {IApplicationState, TFile} from '../../types';

type PropsFromRedux = ConnectedProps<typeof connector>;
type FileViewProps = PropsFromRedux;

const FileView: React.FC<FileViewProps> = (props) => {
    const handleKeydown = (event: globalThis.KeyboardEvent) => {
        if (!props.visible) return;
        if (props.currentIndex! < props.files.length - 1 && event.key === 'ArrowRight') props.fileViewScroll(event.key);
        if (props.currentIndex! > 0 && event.key === 'ArrowLeft') props.fileViewScroll(event.key);
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
        setContextMenuVisible(true);
        setContextMenuPosition({x: e.clientX, y: e.clientY});
        setContextItem(item);
    };

    const handleEmptyClick = () => {
        setContextMenuVisible(false);
    };

    useEffect(() => {
        const keydownListener = (event: globalThis.KeyboardEvent) => handleKeydown(event);
        document.addEventListener('keydown', keydownListener);
        return () => {
            document.removeEventListener('keydown', keydownListener);
        };
    }, [props.files, props.currentIndex]);

    useEffect(() => {
        if (!props.file) {
            if (props.currentIndex! > 0) props.fileViewScroll('ArrowLeft');
            else props.hideFileView();
        }
    }, [props.file]);

    if (!props.visible) return null;

    return (
        <div
            className={s.container}
            onClick={handleEmptyClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleEmptyClick();
                }
            }}
            role='button'
            tabIndex={0}>
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
            <IoClose size={60} color='#ffffff' className={s.close} onClick={() => props.hideFileView()} />
            {props.file && (
                <FileViewItem file={props.file} handleContextMenu={(e) => handleContextMenu(e, props.file as TFile)} />
            )}
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => {
    let file: TFile | undefined;
    let files: TFile[] = [];
    const {fileView} = state.appTemp;
    if (fileView.visible) {
        if (fileView.type === 'files') {
            const currentFolder = state.appTemp.isSearching
                ? {id: 'search'}
                : state.appTemp.folderStack[state.appTemp.folderStack.length - 1];
            const mostRecent = currentFolder.id === 'home' ? state.filesTree.mostRecent : null;

            files = createFilesList(state.filesTree[currentFolder.id] || [], mostRecent, state.files);
            file = files[fileView.index!];
        } else if (fileView.type === 'photos') {
            files = Object.values(state.photos.recents || {});
            file = files[fileView.index!];
        }
    }
    return {
        visible: state.appTemp.fileView.visible,
        file,
        files,
        currentIndex: state.appTemp.fileView.index,
    };
};

const connector = connect(mapStateToProps, {...vault});
export default connector(FileView);

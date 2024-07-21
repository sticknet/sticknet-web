import React, {FC, MouseEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {AiOutlineCamera} from 'react-icons/ai';
import s from './style.css';
import ImageFile from './PreviewImageFile';
import {vault} from '../../actions';
import FileLabel from '../FileLabel';
import {IApplicationState, TFile} from '../../types';

interface FolderProps {
    item: TFile;
    highlighted: number | null;
    setHighlighted: (id: number) => void;
    handleContextMenu: (e: MouseEvent<HTMLButtonElement>) => void;
    index: number;
}

const findFolderIcon = (folderIcon: string): string => {
    switch (folderIcon) {
        case 'blue':
            return 'https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/FolderIcon.png?alt=media&token=43768e1d-c9b5-4da2-a832-49ce533f57c8';
        case 'yellow':
            return 'https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/YellowFolderIcon.png?alt=media&token=31552dd6-a233-411a-8feb-34791c77aec3';
        case 'orange':
            return 'https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/OrangeFolderIcon.png?alt=media&token=f58e4126-0d07-4384-8631-1c368d5a5c8b';
        default:
            return 'https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/FolderIcon.png?alt=media&token=43768e1d-c9b5-4da2-a832-49ce533f57c8';
    }
};

const Folder: FC<Props> = (props) => {
    const {item, highlighted, setHighlighted, handleContextMenu, fetchFiles, openFolder} = props;

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setHighlighted(item.id as number);
    };

    const isFiles = window.location.pathname.startsWith('/vault/files');
    const type = isFiles ? 'files' : 'photos';
    const index = isFiles ? item.fileIndex : props.index;
    const folderSrc = findFolderIcon(props.folderIcon);

    return (
        <button
            type='button'
            className={s.container}
            style={{marginTop: item.isFolder ? 8 : 16}}
            onContextMenu={handleContextMenu}
            onClick={handleClick}
            onDoubleClick={() => {
                if (item.isFolder) {
                    fetchFiles({currentUrl: props.url, folderId: item.id, refresh: true});
                    openFolder(item);
                } else {
                    props.showFileView({index: index as number, type});
                }
            }}>
            <div className={`${s.innerContainer} ${highlighted === item.id && s.highlight}`}>
                {item.isFolder ? (
                    <>
                        <img className={s.image} src={folderSrc} />
                        {item.folderType === 'camera_uploads' && (
                            <AiOutlineCamera color='rgba(0,0,0,0.3)' size={40} className={s.cameraIcon} />
                        )}
                    </>
                ) : item.isPhoto ? (
                    <ImageFile file={item} />
                ) : (
                    <FileLabel file={item} />
                )}
            </div>
            <p
                className={s.name}
                style={{
                    background: highlighted === item.id ? 'rgb(3, 100, 225)' : undefined,
                    color: highlighted === item.id ? '#fff' : '#000',
                }}>
                {item.name}
            </p>
        </button>
    );
};

const mapStateToProps = (state: IApplicationState, ownProps: {item: TFile}) => ({
    url: state.url.filesUrls[ownProps.item.id],
    folderIcon: state.app.preferences.folderIcon,
});

const connector = connect(mapStateToProps, {...vault});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = FolderProps & PropsFromRedux;

export default connector(Folder);

import storage from 'redux-persist/lib/storage';
import {v4 as uuidv4} from 'uuid';
import {Dispatch} from 'redux';
import axios from '../myaxios';
import {API} from '../URL';
import {appTemp, vault, cache, upload, fetched, url, auth} from '../actionTypes';
import {createPreview, createThumbnail, encryptFileVault, decryptTextVault, encryptTextVault} from '../../utils';
import {TVaultNote} from '../../types';

interface IUriKeys {
    uriKey: string;
    previewUriKey: string | null;
}

function findFileName(name: string): string {
    const maxLength = 100;
    if (name.length > maxLength) {
        const dotIndex = name.lastIndexOf('.');
        if (dotIndex !== -1) {
            const namePart = name.substring(0, dotIndex);
            const extensionPart = name.substring(dotIndex);
            const excessLength = name.length - maxLength;
            name = namePart.substring(excessLength) + extensionPart;
        } else {
            name = name.substring(name.length - maxLength);
        }
    }
    return name;
}

export function uploadFiles(
    assets: File[],
    isBasic: boolean,
    folderId: string | number | null,
    isCameraUploads?: boolean,
) {
    return async function (dispatch: Dispatch) {
        const token = (await storage.getItem('#AuthToken')) as string;
        const config = {headers: {Authorization: token}};
        const files: any[] = [];
        const uriKeys: IUriKeys[] = [];
        const encryptedUris: any = {};
        dispatch({type: upload.SHOW_MENU});
        const maxFileSize = 1024000 * 50;
        let totalSize = 0;

        for (let i = 0; i < assets.length; i++) {
            const hasPreview = assets[i].type.startsWith('image') || assets[i].type.startsWith('video');
            let preview;
            let duration = 0;
            const uriKey = uuidv4();
            const previewUriKey = hasPreview ? uuidv4() : null;
            uriKeys.push({uriKey, previewUriKey});
            dispatch({type: upload.COUNT, payload: assets.length});
            dispatch({type: upload.UPLOADING, payload: {progress: 0.001, uriKey}});

            if (assets[i].type.startsWith('image')) {
                preview = await createPreview(assets[i], uriKey, dispatch);
            } else if (assets[i].type.startsWith('video')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(assets[i]);
                video.addEventListener('loadedmetadata', function () {
                    duration = video.duration;
                });
                video.load();
                preview = await createThumbnail(assets[i]);
            }

            const encrypted = await encryptFileVault(assets[i]);
            if (isBasic && assets[i].size > maxFileSize) {
                alert('Maximum size per file is 50MB on basic plan');
                continue;
            }
            const encryptedPreview = hasPreview ? await encryptFileVault(preview) : null;
            totalSize += assets[i].size;
            let item: any = {
                uriKey,
                cipher: encrypted?.cipher,
                fileSize: assets[i].size,
                name: findFileName(assets[i].name),
                isPhoto: hasPreview,
                createdAt: assets[i].lastModified,
                duration,
                type: assets[i].type,
            };

            if (hasPreview) {
                totalSize += preview.size;
                item = {
                    ...item,
                    previewUriKey,
                    previewCipher: encryptedPreview?.cipher,
                    previewFileSize: preview.size,
                    width: preview.width,
                    height: preview.height,
                };
                dispatch({type: cache.CACHE_FILE_VAULT, payload: {uriKey: previewUriKey, uri: preview.uri}});
            }

            files.push(item);
            encryptedUris[uriKey] = {main: encrypted?.blob, preview: hasPreview ? encryptedPreview?.blob : null};
            dispatch({type: cache.CACHE_FILE_VAULT, payload: {uriKey, uri: URL.createObjectURL(assets[i])}});
            if (!hasPreview) dispatch({type: appTemp.FILE_TEMP_LOADED, payload: uriKey});
        }

        dispatch({type: upload.DISPATCH_FILES, payload: files});

        try {
            const response = await axios.post(`${API}/api/get-upload-urls/`, {uriKeys}, config);

            if (response.data.limitReached) {
                alert('Your Vault is full. Upgrade to premium to get bigger Vault space');
                dispatch({type: upload.CLEAR});
                return;
            }

            const data: any = Object.entries(response.data);
            let uploaded = 0;

            for (let i = 0; i < data.length; i++) {
                const uriKey = data[i][0];
                const uri = data[i][1].uri;
                const previewUri = data[i][1].previewUri;
                axios
                    .put(uri, encryptedUris[uriKey]?.main, {
                        onUploadProgress: (e) => {
                              dispatch({
                                type: upload.UPLOADING,
                                payload: {progress: e.loaded / e.total, uriKey},
                            })
                        }

                    })
                    .then(async () => {
                        if (previewUri) axios.put(previewUri, encryptedUris[uriKey]?.preview);
                        dispatch({type: upload.UPLOADED, payload: {uriKey}});
                        uploaded += 1;
                        if (uploaded === data.length) {
                            const uploadResponse = await axios.post(
                                `${API}/api/upload-files/`,
                                {files, folderId, isCameraUploads},
                                config,
                            );
                            dispatch({type: vault.FETCH_FILES, payload: {files: uploadResponse.data}});
                            dispatch({
                                type: vault.FETCH_FILES_TREE,
                                payload: {folderId, files: uploadResponse.data, isCameraUploads},
                            });
                            dispatch({
                                type: vault.FETCH_FILES_TREE,
                                payload: {folderId: 'mostRecent', files: uploadResponse.data, isCameraUploads},
                            });
                            dispatch({
                                type: vault.FETCH_PHOTOS,
                                payload: {albumId: 'recents', photos: uploadResponse.data, newUpload: true},
                            });
                            dispatch({type: auth.UPDATE_STORAGE_USED, payload: totalSize});
                        }
                    });
            }
        } catch (e) {
            console.warn('error in upload-files: ', e);
        }
    };
}

type TFetchFilesParams = {
    currentUrl?: string | null;
    folderId: string | number;
    firstFetch?: boolean;
    refresh: boolean;
    callback?: () => void;
};
export function fetchFiles({currentUrl, folderId, firstFetch, refresh, callback}: TFetchFilesParams) {
    return async function (dispatch: Dispatch) {
        const targetUrl = currentUrl || `${API}/api/fetch-files/?limit=20&folder_id=${folderId}`;
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        const response = await axios.get(targetUrl, config);
        dispatch({type: vault.FETCH_FILES, payload: {files: response.data.results, firstFetch}});
        dispatch({
            type: vault.FETCH_FILES_TREE,
            payload: {folderId, files: response.data.results, refresh},
        });
        dispatch({type: fetched.FETCHED_FOLDER, payload: folderId});
        dispatch({type: url.NEXT_FILES_URL, payload: {url: response.data.next, folderId}});
        callback?.();
    };
}

export function fetchLatestFiles(callback: () => void) {
    return async function (dispatch: Dispatch) {
        const folderId = 'mostRecent';
        const targetUrl = `${API}/api/fetch-latest-files/`;
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        const response = await axios.get(targetUrl, config);
        dispatch({type: vault.FETCH_FILES, payload: {files: response.data.files, firstFetch: true}});
        dispatch({
            type: vault.FETCH_FILES_TREE,
            payload: {folderId, files: response.data.files, refresh: true},
        });
        callback();
    };
}

export function fetchPhotos(
    currentUrl: string | null,
    albumId: string,
    firstFetch: boolean,
    refresh: boolean,
    callback: () => void = () => {},
) {
    return async function (dispatch: Dispatch) {
        const targetUrl = currentUrl || `${API}/api/fetch-photos/?limit=40&album_id=${albumId}`;
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        const response = await axios.get(targetUrl, config);
        dispatch({type: vault.FETCH_PHOTOS, payload: {albumId, photos: response.data.results, firstFetch, refresh}});
        dispatch({type: fetched.FETCHED_VAULT_ALBUM, payload: albumId});
        dispatch({type: url.NEXT_PHOTOS_URL, payload: {url: response.data.next, albumId}});
        callback();
    };
}

export function fetchVaultAlbums(firstFetch: boolean, callback: () => void = () => {}) {
    return async function (dispatch: Dispatch) {
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        const response = await axios.get(`${API}/api/fetch-vault-albums/`, config);
        dispatch({type: vault.FETCH_VAULT_ALBUMS, payload: {albums: response.data, firstFetch}});
        callback();
    };
}

export function fetchVaultNotes(currentUrl: string, firstFetch: boolean, callback: () => void = () => {}) {
    return async function (dispatch: Dispatch) {
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        const response = await axios.get(currentUrl, config);
        const notes = response.data.results;
        for (let i = 0; i < notes.length; i++) {
            notes[i].text = await decryptTextVault(notes[i].cipher);
        }
        dispatch({type: vault.FETCH_VAULT_NOTES, payload: {notes, firstFetch}});
        dispatch({type: url.NEXT_VAULT_NOTES_URL, payload: response.data.next});
        callback();
    };
}

export function createFolder(parentFolderId: string | number, name: string, callback: (id: string) => void = () => {}) {
    return async function (dispatch: Dispatch) {
        const token = (await storage.getItem('#AuthToken')) as string;
        const config = {headers: {Authorization: token}};
        const response = await axios.post(`${API}/api/create-folder/`, {parentFolderId, name}, config);
        dispatch({
            type: vault.FETCH_FILES,
            payload: {
                files: [{...response.data, isFolder: true, uriKey: response.data.id}],
            },
        });
        dispatch({
            type: vault.FETCH_FILES_TREE,
            payload: {
                folderId: parentFolderId,
                files: [{...response.data, isFolder: true, uriKey: response.data.id}],
            },
        });
        callback(response.data.id);
    };
}

export function openFolder(folder: any) {
    return function (dispatch: Dispatch) {
        let path = window.location.pathname;
        if (!path.endsWith('/')) {
            path += '/';
        }
        window.history.pushState(null, '', `${path}${folder.name}/`);
        dispatch({type: appTemp.OPEN_FOLDER, payload: folder});
    };
}

export function closeFolder() {
    return function (dispatch: Dispatch) {
        dispatch({type: appTemp.CLOSE_FOLDER});
    };
}

export function setFolder(folderId: string | number) {
    return function (dispatch: Dispatch) {
        dispatch({type: appTemp.SET_FOLDER, payload: folderId});
        dispatch({type: appTemp.IS_SEARCHING, payload: false});
    };
}

export function hideUploadMenu() {
    return function (dispatch: Dispatch) {
        dispatch({type: upload.HIDE_MENU});
    };
}

type TShowFileViewParams = {index: number; type: string};
export function showFileView({index, type}: TShowFileViewParams) {
    return function (dispatch: Dispatch) {
        dispatch({type: appTemp.SHOW_FILE_VIEW, payload: {index, type}});
    };
}

export function fileViewScroll(action: string) {
    return function (dispatch: Dispatch) {
        dispatch({type: appTemp.FILE_VIEW_SCROLL, payload: action});
    };
}

export function hideFileView() {
    return function (dispatch: Dispatch) {
        dispatch({type: appTemp.HIDE_FILE_VIEW});
    };
}

export function deleteItem(item: any, type: string) {
    return async function (dispatch: Dispatch) {
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        switch (type) {
            case 'file':
                await axios.delete(`${API}/api/files/${item.id}/`, config);
                if (!item.isFolder) dispatch({type: auth.UPDATE_STORAGE_USED, payload: -item.fileSize});
                dispatch({type: vault.DELETE_FILE, payload: {uriKey: item.uriKey}});
                dispatch({type: vault.DELETE_FILE_TREE, payload: {folderId: item.folder, uriKey: item.uriKey}});
                dispatch({type: vault.DELETE_FILE_TREE, payload: {folderId: 'mostRecent', uriKey: item.uriKey}});
                if (item.isPhoto) dispatch({type: vault.DELETE_PHOTO_FILE, payload: {timestamp: item.timestamp}});
                return;
            case 'note':
                await axios.delete(`${API}/api/vault-notes/${item.id}/`, config);
                dispatch({type: vault.DELETE_NOTE, payload: item.timestamp});
                return;
            default:
                console.log('default');
        }
    };
}

export function renamingFile(file: any) {
    return function (dispatch: Dispatch) {
        dispatch({type: appTemp.RENAMING_FILE, payload: file});
    };
}

export function cancelRenaming() {
    return function (dispatch: Dispatch) {
        dispatch({type: appTemp.RENAMING_FILE, payload: null});
    };
}

export function renameFile(file: any, name: string) {
    return async function (dispatch: Dispatch) {
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        const response = await axios.post(`${API}/api/rename-file/`, {id: file.id, name}, config);
        dispatch({type: vault.FETCH_FILES, payload: {files: [{...file, name: response.data.name}]}});
    };
}

export function createVaultNote(text: string, callback: (note: any) => void) {
    return async function (dispatch: Dispatch) {
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        const cipher = await encryptTextVault(text);
        const response = await axios.post(`${API}/api/create-vault-note/`, {cipher}, config);
        if (response.data.limitReached) {
            alert('Maximum notes count is 50 on basic plan');
            return;
        }
        dispatch({
            type: vault.CREATE_NOTE,
            payload: {...response.data, text},
        });
        callback({...response.data, text});
    };
}

interface UpdateVaultNoteParams {
    note: TVaultNote;
    text: string;
}
export function updateVaultNote({note, text}: UpdateVaultNoteParams) {
    return async function (dispatch: Dispatch) {
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        const cipher = await encryptTextVault(text);
        await axios.post(`${API}/api/update-vault-note/`, {id: note.id, cipher}, config);
        dispatch({
            type: vault.UPDATE_VAULT_NOTE,
            payload: {timestamp: note.timestamp, text},
        });
    };
}

export function goToFolder(parts: string[]) {
    return async function (dispatch: Dispatch) {
        dispatch({type: appTemp.RESET_FOLDER_STACK});
        for (let i = 0; i < parts.length; i++) {
            const folderName = parts[i];
            const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
            const response = await axios.get(`${API}/api/fetch-files/?limit=20&folder_name=${folderName}`, config);
            const folderId = response.data.results[0].folder;
            dispatch({type: vault.FETCH_FILES, payload: {files: response.data.results, firstFetch: false}});
            dispatch({
                type: vault.FETCH_FILES_TREE,
                payload: {folderId, files: response.data.results, refresh: false},
            });
            dispatch({type: fetched.FETCHED_FOLDER, payload: folderId});
            dispatch({type: url.NEXT_FILES_URL, payload: {url: response.data.next, folderId}});
            await dispatch({type: appTemp.OPEN_FOLDER, payload: {name: folderName, id: folderId}});
        }
    };
}

export function searchItems(currentUrl: string, refresh: boolean) {
    return async function (dispatch: Dispatch) {
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        const response = await axios.get(currentUrl, config);
        dispatch({type: vault.FETCH_FILES, payload: {files: response.data.results}});
        dispatch({type: vault.FETCH_FILES_TREE, payload: {files: response.data.results, folderId: 'search', refresh}});
        dispatch({type: appTemp.IS_SEARCHING, payload: true});
        dispatch({type: appTemp.IS_EMTPY_SEARCH, payload: response.data.results.length === 0});
        dispatch({type: url.NEXT_SEARCH_URL, payload: response.data.next});
    };
}

export function movingFile(file: any) {
    return function (dispatch: Dispatch) {
        dispatch({type: appTemp.MOVING_FILE, payload: file});
    };
}

export function cancelMovingFile() {
    return function (dispatch: Dispatch) {
        dispatch({type: appTemp.DISPATCH_APPTEMP_PROPERTY, payload: {movingFile: null}});
    };
}

export function moveFile(file: any, folder: any) {
    return async function (dispatch: Dispatch) {
        const config = {headers: {Authorization: (await storage.getItem('#AuthToken')) as string}};
        await axios.post(`${API}/api/move-file/`, {fileId: file.id, folderId: folder.id}, config);
        await dispatch({
            type: vault.MOVE_FILE,
            payload: {file, destinationFolderId: folder.id, sourceFolderId: file.folder},
        });
        dispatch({type: vault.FETCH_FILES, payload: {files: [{...file, folder: folder.id}]}});
        dispatch({type: appTemp.DISPATCH_APPTEMP_PROPERTY, payload: {movingFile: null}});
    };
}

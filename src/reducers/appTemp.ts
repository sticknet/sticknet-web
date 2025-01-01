import {Action} from 'redux';
import {appTemp} from '../actions/actionTypes';
import {handleHistoryFilePath} from '../utils';
import type {TDevice, TFile, TFolder} from '../types';

export interface IAppTempState {
    country: {name: string; dialCode: string; code: string};
    folderStack: TFolder[];
    albumStack: {id: string; name: string}[];
    fileView: {visible: boolean; index: number | null; type: string};
    fileTempLoaded: {[key: string]: boolean};
    renamingFile: TFile | null;
    movingFile: TFile | null;
    emptySearch: boolean;
    isSearching: boolean;
    walletVerified: string | null;
    cancelMenus: number;
    devices: TDevice[];
}

export interface ICountryAction extends Action {
    payload: {name: string; dialCode: string; code: string};
}

export interface IOpenFolderAction extends Action {
    payload: TFolder;
}

export interface ISetFolderAction extends Action {
    payload: string;
}

export interface IShowFileViewAction extends Action {
    payload: {index: number; type: string};
}

export interface IFileViewScrollAction extends Action {
    payload: 'ArrowRight' | 'ArrowLeft';
}

export interface IOpenAlbumAction extends Action {
    payload: {id: string; name: string};
}

export interface IFileTempLoadedAction extends Action {
    payload: string;
}

export interface IIsEmptySearchAction extends Action {
    payload: boolean;
}

export interface IIsSearchingAction extends Action {
    payload: boolean;
}

export interface IRenamingFileAction extends Action {
    payload: TFile;
}

export interface IMovingFileAction extends Action {
    payload: TFile;
}

export interface IDispatchAppTempPropertyAction extends Action {
    payload: Partial<IAppTempState>;
}

export interface IFetchDevicesAction extends Action {
    payload: TDevice[];
}

type TAppTempActions =
    | ICountryAction
    | IOpenFolderAction
    | ISetFolderAction
    | IShowFileViewAction
    | IFileViewScrollAction
    | IOpenAlbumAction
    | IFileTempLoadedAction
    | IIsEmptySearchAction
    | IIsSearchingAction
    | IRenamingFileAction
    | IMovingFileAction
    | IDispatchAppTempPropertyAction
    | IFetchDevicesAction;

export const appTempInitialState: IAppTempState = {
    country: {name: 'United States', dialCode: '+1', code: 'US'},
    folderStack: [{id: 'home', name: 'home'}],
    albumStack: [
        {id: 'home', name: 'home'},
        {id: 'recents', name: 'recents'},
    ],
    fileView: {visible: false, index: null, type: 'files'},
    fileTempLoaded: {},
    renamingFile: null,
    walletVerified: null,
    movingFile: null,
    emptySearch: false,
    isSearching: false,
    cancelMenus: 0,
    devices: [],
};

export default function (state: IAppTempState = appTempInitialState, action: TAppTempActions): IAppTempState {
    switch (action.type) {
        case appTemp.COUNTRY:
            const countryPayload = action.payload as ICountryAction['payload'];
            return {...state, country: countryPayload};

        case appTemp.RESET_APP_TEMP_STATE:
            return appTempInitialState;

        case appTemp.OPEN_FOLDER:
            const openFolderPayload = action.payload as IOpenFolderAction['payload'];
            return {...state, folderStack: [...state.folderStack, openFolderPayload]};

        case appTemp.CLOSE_FOLDER:
            handleHistoryFilePath(state.folderStack);
            if (state.folderStack.length === 1) return state;
            const folderStackCopy = [...state.folderStack];
            folderStackCopy.pop();
            return {...state, folderStack: folderStackCopy};

        case appTemp.SET_FOLDER:
            const setFolderPayload = action.payload as ISetFolderAction['payload'];
            let removeCount = 0;
            const stack = [...state.folderStack];
            while (
                state.folderStack.length > 1 &&
                state.folderStack[state.folderStack.length - 1].id !== setFolderPayload
            ) {
                state.folderStack.pop();
                removeCount -= 1;
            }
            handleHistoryFilePath(stack, removeCount);
            return {...state};

        case appTemp.RESET_FOLDER_STACK:
            return {...state, folderStack: [{id: 'home', name: 'home'}]};

        case appTemp.SHOW_FILE_VIEW:
            const showFileViewPayload = action.payload as IShowFileViewAction['payload'];
            return {
                ...state,
                fileView: {visible: true, index: showFileViewPayload.index, type: showFileViewPayload.type},
            };

        case appTemp.HIDE_FILE_VIEW:
            return {...state, fileView: {visible: false, index: null, type: 'files'}};

        case appTemp.FILE_VIEW_SCROLL:
            const fileViewScrollPayload = action.payload as IFileViewScrollAction['payload'];
            const newIndex =
                fileViewScrollPayload === 'ArrowRight' ? state.fileView.index! + 1 : state.fileView.index! - 1;
            return {...state, fileView: {...state.fileView, index: newIndex}};

        case appTemp.OPEN_ALBUM:
            const openAlbumPayload = action.payload as IOpenAlbumAction['payload'];
            return {...state, albumStack: [...state.albumStack, openAlbumPayload]};

        case appTemp.CLOSE_ALBUM:
            if (state.albumStack.length === 1) return state;
            const albumStackCopy = [...state.albumStack];
            albumStackCopy.pop();
            return {...state, albumStack: albumStackCopy};

        case appTemp.FILE_TEMP_LOADED:
            const fileTempLoadedPayload = action.payload as IFileTempLoadedAction['payload'];
            return {...state, fileTempLoaded: {...state.fileTempLoaded, [fileTempLoadedPayload]: true}};

        case appTemp.IS_EMTPY_SEARCH:
            const isEmptySearchPayload = action.payload as IIsEmptySearchAction['payload'];
            return {...state, emptySearch: isEmptySearchPayload};

        case appTemp.IS_SEARCHING:
            const isSearchingPayload = action.payload as IIsSearchingAction['payload'];
            return {...state, isSearching: isSearchingPayload};

        case appTemp.RENAMING_FILE:
            const renamingFilePayload = action.payload as IRenamingFileAction['payload'];
            return {...state, renamingFile: renamingFilePayload};

        case appTemp.CANCEL_MENUS:
            return {...state, cancelMenus: state.cancelMenus + 1};

        case appTemp.MOVING_FILE:
            const movingFilePayload = action.payload as IMovingFileAction['payload'];
            return {...state, movingFile: movingFilePayload};

        case appTemp.DISPATCH_APPTEMP_PROPERTY:
            const dispatchAppTempPropertyPayload = action.payload as IDispatchAppTempPropertyAction['payload'];
            return {...state, ...dispatchAppTempPropertyPayload};

        case appTemp.FETCH_DEVICES:
            const fetchDevicesPayload = action.payload as IFetchDevicesAction['payload'];
            return {...state, devices: fetchDevicesPayload};

        default:
            return state;
    }
}

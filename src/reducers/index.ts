import {combineReducers} from 'redux';
import app from './app';
import appTemp from './appTemp';
import progress from './progress';
import auth from './auth';
import files from './vault/files';
import vaultCache from './cache/vaultCache';
import upload from './upload';
import download from './download';
import photos from './vault/photos';
import vaultAlbums from './vault/vaultAlbums';
import fetched from './fetched';
import vaultNotes from './vault/vaultNotes';
import url from './url';
import filesTree from './vault/filesTree';
import heic from './heic';

export default combineReducers({
    app,
    appTemp,
    progress,
    auth,
    files,
    vaultCache,
    upload,
    download,
    photos,
    vaultAlbums,
    fetched,
    vaultNotes,
    url,
    filesTree,
    heic,
});

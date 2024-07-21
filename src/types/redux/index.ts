import type {IVaultCacheState} from '../../reducers/cache/vaultCache';
import type {IFilesState} from '../../reducers/vault/files';
import type {IFilesTreeState} from '../../reducers/vault/filesTree';
import type {IPhotosState} from '../../reducers/vault/photos';
import type {IVaultAlbumsState} from '../../reducers/vault/vaultAlbums';
import type {IVaultNotesState} from '../../reducers/vault/vaultNotes';
import type {IAppState} from '../../reducers/app';
import type {IAuthState} from '../../reducers/auth';
import type {IAppTempState} from '../../reducers/appTemp';
import type {IDownloadState} from '../../reducers/download';
import type {IFetchedState} from '../../reducers/fetched';
import type {IHeicProcessingState} from '../../reducers/heic';
import type {IProgressState} from '../../reducers/progress';
import type {IUploadState} from '../../reducers/upload';
import type {IUrlState} from '../../reducers/url';

export interface IApplicationState {
    app: IAppState;
    auth: IAuthState;
    appTemp: IAppTempState;
    download: IDownloadState;
    fetched: IFetchedState;
    heic: IHeicProcessingState;
    progress: IProgressState;
    upload: IUploadState;
    url: IUrlState;
    vaultCache: IVaultCacheState;
    files: IFilesState;
    filesTree: IFilesTreeState;
    photos: IPhotosState;
    vaultAlbums: IVaultAlbumsState;
    vaultNotes: IVaultNotesState;
}

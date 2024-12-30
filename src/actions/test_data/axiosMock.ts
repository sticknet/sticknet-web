import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import state from './state.json';
import {API} from '../URL';

class FormDataMock {
    append = jest.fn();
}

const axiosMock = () => {
    // @ts-ignore
    global.FormData = FormDataMock as any;
    const mockURL = API;
    const mock = new MockAdapter(axios);

    // actions/auth
    mock.onGet(`${mockURL}/api/refresh-user/?should_get_firebase_token=true`).reply(200, {
        user: {
            ...state.auth.user,
            username: 'bob999',
            groups: [...state.auth.user.groups, {id: 'mockGroupId'}],
            highlightsIds: [{id: 'mockId'}],
            hiddenImages: [{id: 'mockId'}],
        },
        preKeysCount: 10,
        unreadCount: 3,
    });
    mock.onPost(`${mockURL}/api/register/`).reply(200, {
        success: true,
        user: {id: 'userX', email: 'test@test.com', groups: [{id: 'groupX'}]},
    });
    mock.onPost(`${mockURL}/api/web-login/`).reply(200, {
        correct: true,
        token: 'token',
        user: {id: 'userX', email: 'test@test.com', groups: [{id: 'groupX'}]},
        webKey: 'webKey',
    });
    mock.onPost(`${mockURL}/api/upload-pkb/`).reply(200, {
        partyId: 'partyIdX',
        selfPartyId: 'selfPartyIdX',
        token: 'tokenX',
    });
    mock.onGet(`${mockURL}/api/fetch-preferences/`).reply(200, {
        favoritesIds: ['favA', 'favB'],
        chatDeviceId: 'deviceX',
        folderIcon: 'blue',
    });
    mock.onPost(`${mockURL}/api/check-username/`).reply(200, {valid: true});
    mock.onPost(`${mockURL}/api/fetch-devices/`).reply(200, [{id: 'deviceA'}]);
    mock.onGet(`${mockURL}/api/fetch-user-devices/`).reply(200, [{id: 'deviceA'}]);
    mock.onPost(`${mockURL}/api/update-chat-device/`).reply(200);
    mock.onPost(`${mockURL}/api/recreate-user/`).reply(200, {
        user: {id: 'newUserId', phone: '+1234', groups: [{id: 'groupX'}]},
        success: true,
    });
    mock.onPost(`${mockURL}/api/auth/logout/`).reply(200);
    mock.onPost(`${mockURL}/api/request-email-code/`).reply(200, {registered: true});
    mock.onPost(`${mockURL}/api/verify-email-code/`).reply(200, {correct: true, exists: true, userId: 'abc'});

    // actions/vault
    mock.onPost(`${mockURL}/api/upload-files/`).reply(200, [
        {id: 'file1', uriKey: 'uriKey1', type: 'image/jpeg'},
        {id: 'file2', uriKey: 'uriKey2', type: 'image/jpeg'},
    ]);
    mock.onGet(`${mockURL}/api/fetch-files/?limit=20&folder_id=folderId`).reply(200, {
        results: [{uriKey: 'file1'}, {uriKey: 'file2'}],
    });
    mock.onGet(new RegExp(`${mockURL}/api/fetch-files/\\?limit=20&folder_name=.*`)).reply(200, {
        results: [{uriKey: 'file1'}, {uriKey: 'file2'}],
    });
    mock.onGet(`${mockURL}/api/fetch-latest-files/`).reply(200, {
        results: [{uriKey: 'file1'}, {uriKey: 'file2'}],
    });
    mock.onPut(`mockUri1`).reply(200, {});
    mock.onPut(`mockPreviewUri1`).reply(200, {});
    mock.onPut(`mockUri2`).reply(200, {});
    mock.onPut(`mockPreviewUri2`).reply(200, {});
    mock.onGet(`${mockURL}/api/fetch-photos/?limit=40&album_id=albumId`).reply(200, {
        results: [
            {timestamp: 'photo1', type: 'image/jpeg'},
            {timestamp: 'photo2', type: 'image/jpeg'},
        ],
    });
    mock.onGet(`${mockURL}/api/fetch-vault-albums/`).reply(200, {data: [{timestamp: 'album1'}, {timestamp: 'album2'}]});
    mock.onGet(`${mockURL}/api/fetch-vault-notes/`).reply(200, {
        results: [
            {timestamp: 'note1', cipher: 'cipher1'},
            {timestamp: 'note2', cipher: 'cipher2'},
        ],
    });
    mock.onPost(`${mockURL}/api/move-file/`).reply(200, {});
    mock.onPost(`${mockURL}/api/rename-file/`).reply(200, {name: 'newName'});
    mock.onDelete(new RegExp(`${mockURL}/api/files/`)).reply(200, {});
    mock.onPost(`${mockURL}/api/get-upload-urls/`).reply(200, {
        uriKey1: {uri: 'mockUri1', previewUri: 'mockPreviewUri1'},
        uriKey2: {uri: 'mockUri2', previewUri: 'mockPreviewUri2'},
    });
    mock.onPost(`${mockURL}/api/create-folder/`).reply(200, {id: 'folderId', name: 'name'});
    mock.onPost(`${mockURL}/api/create-vault-album/`).reply(200, {id: 'albumId', name: 'name'});
    mock.onPost(`${mockURL}/api/create-vault-note/`).reply(200, {
        id: 'noteId',
        text: 'encryptedText',
        limitReached: false,
    });
    mock.onPost(`${mockURL}/api/update-vault-note/`).reply(200);
    mock.onPost(`${mockURL}/api/delete-files/`).reply(200);
    mock.onGet(`${mockURL}/api/fetch-vault-notes/`).reply(200, {results: [{id: 'note1', text: 'abc'}]});
    mock.onGet(`${mockURL}/api/search-files/?q=flower&limit=15`).reply(200, {
        results: [{id: 'fileId', uriKey: 'uriKey', name: 'flower.jpeg'}],
    });
    mock.onGet(`${mockURL}/api/fetch-chat-files/?ids=file1`).reply(200, {
        data: [{id: 'file1', uriKey: 'uriKey1'}],
    });
    mock.onGet(`${mockURL}/api/fetch-single-chat-album/?id=album1`).reply(200, {
        data: {
            album: {id: 'album1', timestamp: 1620000000000},
        },
    });
    mock.onGet(`${mockURL}/api/fetch-chat-audio/?id=audio1`).reply(200, {
        audio: {id: 'audio1', uri: 'audioUri'},
    });

    // actions/iap
    mock.onGet(`${mockURL}/api/fetch-subscription-details/`).reply(200, {expires: 123});
    mock.onPost(`${mockURL}/api/verify-receipt/`).reply(200, {success: true});
};

export default axiosMock;

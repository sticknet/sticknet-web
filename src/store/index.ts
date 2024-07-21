import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';
import whitelist from './whitelist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default function configureStore(preloadedState: object = {}) {
    const store = createStore(persistedReducer, preloadedState, applyMiddleware(thunk));
    const persistor = persistStore(store);
    return {
        store,
        persistor,
    };
}

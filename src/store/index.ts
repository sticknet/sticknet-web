import {applyMiddleware, createStore, Store} from 'redux';
import {Persistor, persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';
import whitelist from './whitelist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist,
};

// eslint-disable-next-line import/no-mutable-exports
let store: Store;
let persistor: Persistor;

const persistedReducer = persistReducer(persistConfig, reducers);

export default function configureStore(preloadedState: object = {}) {
    store = createStore(persistedReducer, preloadedState, applyMiddleware(thunk));
    persistor = persistStore(store);
    return {
        store,
        persistor,
    };
}

export {store, persistStore};

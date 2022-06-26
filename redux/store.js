import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';

// import { AsyncStorage } from 'react-native';

import loginReducer from './reducers';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user']
};
const rootReducer = combineReducers({
    loginReducer: persistReducer(persistConfig, loginReducer)
});


export const store = createStore(rootReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

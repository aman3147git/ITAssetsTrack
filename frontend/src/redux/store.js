import {configureStore,combineReducers} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import requestSlice from './requestSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const rootReducer=combineReducers({
    auth:authSlice,
    requests:requestSlice
})
const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store =configureStore({
    reducer:
        persistedReducer,
        middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
    
})
export default store;
export const persistor = persistStore(store);
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/login/authSlice.js';
import accessReducer from '../features/login/accessSlice.js';
import arenaReducer from '../features/arena/arenaSlice.js';
import rtcReducer from '../features/arena/rtcSlice.js';
import stompClientReducer from '../features/arena/stompClientSlice.js';

const persistConfig = {
  key : 'root',
  storage,
  whitelist : ['auth']
};

const rootReducer = combineReducers({
  auth : authReducer,
  access : accessReducer,
  arena: arenaReducer,
  rtc: rtcReducer,
  stompClient: stompClientReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

});

export const persistor = persistStore(store);
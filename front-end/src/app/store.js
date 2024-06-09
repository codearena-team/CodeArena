import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/login/authSlice.js';
import accessReducer from '../features/login/accessSlice.js';
import arenaReducer from '../features/arena/arenaSlice.js';
import rtcReducer from '../features/arena/rtcSlice.js';
import stompClientReducer from '../features/arena/stompClientSlice.js';
import gameReducer from '../features/arena/gameSlice.js';

const persistConfig = {
  key : 'root',
  storage,
  whitelist : ['auth', 'game']
};

const rootReducer = combineReducers({
  auth : authReducer,
  access : accessReducer,
  arena: arenaReducer,
  rtc: rtcReducer,
  stompClient: stompClientReducer,
  game: gameReducer, 
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false, // 비직렬화 가능한 값 경고 비활성화
  }),
});

export const persistor = persistStore(store);
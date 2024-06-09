import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export const authSlice = createSlice({
  name : 'auth',
  initialState : {
    refreshToken : null,
    isLogin : false,
    userId : null,
    userEmail : null,
    userNickname : null,
    speed : null,
    eff : null,
    userThumbnail : null,
    userCoin : null

  },
  reducers : {
    setUserNickname : (state,action) =>{
      state.userNickname = action.payload
    },
    // action.payload 는 res.data.data
    setRefreshToken : (state,action) =>{
      state.refreshToken = action.payload.refreshToken;
      state.isLogin = true;
      state.userId = jwtDecode(action.payload.refreshToken).userId
      state.userEmail = jwtDecode(action.payload.refreshToken).userEmail
      state.userNickname = jwtDecode(action.payload.refreshToken).userNickname
      state.userThumbnail = jwtDecode(action.payload.refreshToken).userThumbnail
      state.userCoin = jwtDecode(action.payload.refreshToken).userCoin
    },
    setThumbnail : (state,action) =>{
      state.userThumbnail = action.payload;
    },
    
    logout: (state) =>{
      state.refreshToken = null;
      state.isLogin = false;
      state.userId = null;
      state.userEmail = null;
      state.userNickname = null;
      state.speed = null;
      state.eff = null;
      state.userCoin = null;
      state.userThumbnail = null;

    },
    setRecord: (state,action) => {
      state.speed = jwtDecode(action.payload).speed
      state.eff = jwtDecode(action.payload).eff
    },
    setUserCoin:  (state,action) => {
      state.userCoin = action.payload
    },
    updateArenadata : (state,action) =>{
      state.speed = action.payload.userInfoDto.speedRating
      state.eff = action.payload.userInfoDto.effiRating
      state.userCoin = action.payload.userInfoDto.userCoin
    },
  }  
})

export const { setRefreshToken, logout, setUserNickname, setRecord, setUserCoin, setThumbnail, updateArenadata } = authSlice.actions
export default authSlice.reducer
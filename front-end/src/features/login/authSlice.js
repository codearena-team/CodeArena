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
    logout: (state) =>{
      state.refreshToken = null;
      state.isLogin = false;
      state.userId = null;
      state.userEmail = null;
      state.userNickname = null;
    },
    setRecord: (state,action) => {
      state.speed = jwtDecode(action.payload).speed
      state.eff = jwtDecode(action.payload).eff
    }
  }  
})

export const { setRefreshToken,logout,setUserNickname,setRecord } = authSlice.actions
export default authSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export const authSlice = createSlice({
  name : 'auth',
  initialState : {
    refreshToken : null,
    isLogin : false,
    userId : null,
    userEmail : null,
    userNickname : null
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
    },
    logout: (state) =>{
      state.refreshToken = null;
      state.isLogin = false;
      state.userId = null;
      state.userEmail = null;
      state.userNickname = null;
    },
  }  
})

export const { setRefreshToken,logout,setUserNickname } = authSlice.actions
export default authSlice.reducer
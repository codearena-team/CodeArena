import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'

export const authSlice = createSlice({
  name : 'auth',
  initialState : {
    accessToken : null,
    refreshToken : null,
    isLogin : false,
    userId : null,
    userEmail : null,
    userNickname : null
  },
  reducers : {
    // action.payload 는 res.data.data
    setToken : (state,action) =>{
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLogin = true;
      state.userId = jwtDecode(action.payload.accessToken).userId
      state.userEmail = jwtDecode(action.payload.accessToken).userEmail
      state.userNickname = jwtDecode(action.payload.accessToken).userNickname
    },
    logout: (state) =>{
      state.accessToken = null;
      state.refreshToken = null;
      state.isLogin = false;
      state.userId = null;
      state.userEmail = null;
      state.userNickname = null;
    }
  }  
})

export const { setToken,logout } = authSlice.actions
export default authSlice.reducer
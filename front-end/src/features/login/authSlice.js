import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name : 'auth',
  initialState : {
    refreshtoken : '',
    isLogIn : false
  },
  reducers : {
    setToken : (state,action) =>{
      state.refreshtoken = action.payload;
      state.isLogIn = true;
    },
    logout: (state) =>{
      state.refreshtoken = null;
      state.isLogIn = false;
    }
  }  
})

export const { setToken,logout } = authSlice.actions
export default authSlice.reducer
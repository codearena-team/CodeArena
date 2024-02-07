import { createSlice } from '@reduxjs/toolkit';

export const accessSlice = createSlice({
  name : 'access',
  initialState : {
    accessToken : null
  },
  reducers : {
    setAccessToken :(state,action) =>{
      state.accessToken = action.payload
      
    }
  }
})

export const { setAccessToken } = accessSlice.actions
export default accessSlice.reducer
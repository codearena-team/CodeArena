import { createSlice } from '@reduxjs/toolkit';

export const rtcSlice = createSlice({
  name : 'rtc',
  initialState : {
    streamManager : null,
    mySession : null,
  },
  reducers : {
    setStreamManager : (state,action) =>{
      state.streamManager = action.payload
    },
    setMySesssion : (state,action) =>{
      state.mySession = action.payload
    }
  }
})

export const { setStreamManager } = rtcSlice.actions
export default rtcSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

export const rtcSlice = createSlice({
  name : 'rtc',
  initialState : {
    streamManager : null,
  },
  reducers : {
    setStreamManager : (state,action) =>{
      const tmp = action.payload
      state.streamManager = tmp
    }
  }
})

export const { setStreamManager } = rtcSlice.actions
export default rtcSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

export const stompClientSlice = createSlice({
  name : 'stompClient',
  initialState : {
    stompClient : null,
  },
  reducers : {
    setStompClients : (state, action) =>{
      state.stompClient = action.payload;
    },
    clearStompClient: (state) => {
      state.stompClient = null;
    }
  }  
})

export const { setStompClients, clearStompClient } = stompClientSlice.actions
export default stompClientSlice.reducer
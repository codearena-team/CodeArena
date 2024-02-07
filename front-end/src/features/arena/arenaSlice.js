import { createSlice } from '@reduxjs/toolkit';

export const arenaSlice = createSlice({
  name : 'arena',
  initialState : {
    gameId : null,
  },
  reducers : {
    setGameId : (state,action) =>{
      state.gameId = action.payload
    }
  }  
})

export const { setGameId } = arenaSlice.actions
export default arenaSlice.reducer
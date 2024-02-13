import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name : 'arenaGames',
  initialState : {
    problemId: null,
    gameMode: null,
    lang: null,
    gameId: null,
    userId: null,
    userNickname: null,
    enemyId: null,
    enemyNickname: null,
    userImgSrc: null,
    enemyImgSrc: null,
    startTime: null,
  },
  reducers : {
    // set 할 때 쓰기 위함
    setGameInfo: (state, action) => {
      const {
        problemId,
        gameMode,
        lang,
        gameId,
        userId,
        userNickname,
        enemyId,
        enemyNickname,
        userImgSrc,
        enemyImgSrc,
        startTime,
      } = action.payload;

      state.problemId = problemId;
      state.gameMode = gameMode;
      state.lang = lang;
      state.gameId = gameId;
      state.userId = userId;
      state.userNickname = userNickname;
      state.enemyId = enemyId;
      state.enemyNickname = enemyNickname;
      state.userImgSrc = userImgSrc;
      state.enemyImgSrc = enemyImgSrc;
      state.startTime = startTime;
    },
    resetGameInfo: (state) => {
      // 비워야 할 때를 쓰기 위함 -> 쓰지않을 수도 있지만 미리 만들어둠
      state.problemId = null;
      state.gameMode = null;
      state.lang = null;
      state.gameId = null;
      state.userId = null;
      state.userNickname = null;
      state.enemyId = null;
      state.enemyNickname = null;
      state.userImgSrc = null;
      state.enemyImgSrc = null;
      state.startTime = null;
    },
  }  
})

export const { setGameInfo, resetGameInfo } = gameSlice.actions
export default gameSlice.reducer
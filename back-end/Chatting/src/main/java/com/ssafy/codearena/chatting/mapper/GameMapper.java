package com.ssafy.codearena.chatting.mapper;

import com.ssafy.codearena.chatting.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface GameMapper {
    public int findProblemById() throws Exception;
    public GameInfoDto findRoomById(String gameId) throws Exception;
    public List<GameInfoDto> findAllRoom(Map<String, Object> map) throws Exception;
    public int getTotalGameCount(Map<String, Object> map) throws Exception;
    public void createCompetitiveRoom(GameCreateDto gameCreateDto) throws Exception;
    public void createPrivateRoom(PrivateGameCreateDto privateGameCreateDto) throws Exception;
    public void terminateGame(String gameId, String winner) throws Exception;
    public int passProblem(String gameId, String player1, String player2) throws Exception;
    public WinnerInfoDto winnerSearch(String gameId) throws Exception;
    public int isRating(Map<String, String> param) throws Exception;
    public void refreshRating(String userId, String rating, String gamemode) throws Exception;
    public CompetitiveUserInfoDto getUserInfo(String userId, String gamemode) throws Exception;
    public void startPrivateGame(Map<String, String> param) throws Exception;
    public CompetitiveWinnerInfoDto whoWinner(String gameId) throws Exception;
    public List<CompetitiveGameSubmitDto> getSubmitList(String gameId) throws Exception;
    public String getUserNickname(String userId) throws Exception;
    public String getStartTime(String gameId) throws Exception;
}

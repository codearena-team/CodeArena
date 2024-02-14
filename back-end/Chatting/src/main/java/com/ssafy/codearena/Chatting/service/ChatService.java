package com.ssafy.codearena.Chatting.service;
import com.ssafy.codearena.Chatting.dto.*;

import java.util.List;
import java.util.Map;

public interface ChatService {
    public GameResultDto findAllRoom(Map<String, String> map);
    public GameResultDto findRoomById(String gameId);
    public GameResultDto createCompetitiveRoom(GameCreateDto gameCreateDto);
    public GameResultDto createPrivateRoom(PrivateGameCreateDto privateGameCreateDto);
    public void plusParticipants(String gameId);
    public void minusParticipants(String gameId);
    public boolean playerLeaveEvent(String gameId, String playerId);
    public boolean PrivateplayerLeaveEvent(String gameId, String playerId);
    public void plusCandidates(String gameId, String userId);
    public void minusCandidates(String gameId, String userId);
    public String terminateGame(String gameId, String winner);
    public WinnerInfoDto findWinner(String gameId);
    public List<CompetitiveTopMatchResultDto> getTopFiveMatch();
    public RestResultDto getCandidates(String gameId);
    public GameResultDto startPrivateGame(String gameId);
    public GameResultDto whoWinner(String gameId);

}
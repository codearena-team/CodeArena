package com.ssafy.codearena.Chatting.service;
import com.ssafy.codearena.Chatting.dto.GameCreateDto;
import com.ssafy.codearena.Chatting.dto.GameResultDto;
import java.util.List;
import java.util.Map;

public interface ChatService {
    public GameResultDto findAllRoom(Map<String, String> map);
    public GameResultDto findRoomById(String id);
    public GameResultDto createPrivateRoom(GameCreateDto gameCreateDto);
    public void plusParticipants(String gameId);
    public void minusParticipants(String gameId);
}
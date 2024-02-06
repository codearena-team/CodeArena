package com.ssafy.codearena.Chatting.mapper;

import com.ssafy.codearena.Chatting.dto.GameCreateDto;
import com.ssafy.codearena.Chatting.dto.GameInfoDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface GameMapper {
    public int findProblemById() throws Exception;
    public GameInfoDto findRoomById(String gameId) throws Exception;
    public List<GameInfoDto> findAllRoom(Map<String, Object> map) throws Exception;
    public int getTotalGameCount(Map<String, Object> map) throws Exception;
    public void createPrivateRoom(GameCreateDto gameCreateDto) throws Exception;
    public void terminateGame(String gameId, String winner) throws Exception;
    public void passProblem(String gameId, String userId) throws Exception;
}

package com.ssafy.codearena.Chatting.mapper;

import com.ssafy.codearena.Chatting.dto.BatPlayerCountDto;
import com.ssafy.codearena.Chatting.dto.BatUserCoinDto;
import com.ssafy.codearena.Chatting.dto.MaxBatUserInfoDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.jdbc.SQL;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface BattingMapper {
    public int getUserCoin(String userId) throws Exception;
    public void updateUserCoin(String userId, String coin) throws Exception;
    public void updateUserPlusCoin(String userId, String coin) throws Exception;
    public void batPlayer(Map<String, String> map) throws Exception;
    public BatPlayerCountDto getPlayerCount(Map<String, String> map) throws Exception;
    public List<BatUserCoinDto> getUserBatCoin(String gameId, String winner) throws SQLException;
    public MaxBatUserInfoDto getMaxBatUser(String gameId, String playerId) throws SQLException;
    public int getPlayerSumPeople(String gameId, String playerId) throws SQLException;
    public int getUserBatStatus(String gameId, String userId) throws SQLException;

}

package com.ssafy.codearena.Chatting.mapper;

import com.ssafy.codearena.Chatting.dto.BatPlayerCountDto;
import com.ssafy.codearena.Chatting.dto.BatUserCoinDto;
import org.apache.ibatis.annotations.Mapper;

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

}

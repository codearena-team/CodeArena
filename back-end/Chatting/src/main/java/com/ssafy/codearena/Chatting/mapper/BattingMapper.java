package com.ssafy.codearena.Chatting.mapper;

import com.ssafy.codearena.Chatting.dto.BatPlayerCountDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface BattingMapper {
    public int getUserCoin(String userId) throws Exception;
    public void updateUserCoin(String userId, String coin) throws Exception;
    public void batPlayer(Map<String, String> map) throws Exception;
    public BatPlayerCountDto getPlayerCount(Map<String, String> map) throws Exception;
}

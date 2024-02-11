package com.ssafy.codearena.Chatting.mapper;


import com.ssafy.codearena.Chatting.dto.GamePlayerDto;
import com.ssafy.codearena.Chatting.dto.CompetitiveResultDto;
import com.ssafy.codearena.Chatting.dto.CompetitiveUserInfoDto;
import com.ssafy.codearena.Chatting.dto.GameRecordDto;
import com.ssafy.codearena.Chatting.dto.SubmitDto;
import com.ssafy.codearena.Chatting.dto.UserRecordDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface RestMapper {
    void insertSubmit(SubmitDto submitDto) throws SQLException;
    List<GamePlayerDto> getEffRankingbyRating() throws SQLException;
    List<GamePlayerDto> getSpeedRankingByRating() throws SQLException;

    GamePlayerDto getUserRecordByUserId(String userId) throws SQLException;

    CompetitiveResultDto getGameInfo(String gameId) throws Exception;
    CompetitiveUserInfoDto getPlayerInfo(String userId, String gameMode) throws Exception;
    List<GameRecordDto> getRecordsByUserId(String userId) throws SQLException;
}

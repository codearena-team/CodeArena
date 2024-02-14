package com.ssafy.codearena.Chatting.mapper;


import com.ssafy.codearena.Chatting.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface RestMapper {
    void insertSubmit(SubmitDto submitDto) throws SQLException;
    List<GamePlayerDto> getEffRankingbyRating() throws SQLException;
    List<GamePlayerDto> getSpeedRankingByRating() throws SQLException;

    List<GamePlayerDto> getPointRankingByPoint() throws SQLException;

    GamePlayerDto getUserRecordByUserId(String userId) throws SQLException;

    CompetitiveResultDto getGameInfo(String gameId) throws Exception;
    CompetitiveUserInfoDto getPlayerInfo(String userId, String gameMode) throws Exception;
    List<GameRecordDto> getRecordsByUserId(String userId) throws SQLException;
    List<CompetitiveGameSubmitDto> getEffiSubmitList(Map<String, Object> param) throws Exception;
    int getTotalSubmitCount(Map<String, Object> param) throws Exception;
}

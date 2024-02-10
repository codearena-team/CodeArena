package com.ssafy.codearena.Chatting.dto;


import lombok.Data;

import java.util.List;

@Data
public class GamePlayerDto {
    String userId;
    String userNickname;
    String effRating;
    String speedRating;
    UserRecordDto record;
    List<ArenaProblemDto> recentProblems;
    List<UserDto> recentUsers;
}

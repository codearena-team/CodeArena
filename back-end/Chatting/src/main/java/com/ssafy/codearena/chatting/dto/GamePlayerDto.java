package com.ssafy.codearena.chatting.dto;


import lombok.Data;

import java.util.List;

@Data
public class GamePlayerDto {
    String userId;
    String userNickname;
    String effRating;
    String speedRating;
    String point;
    UserRecordDto record;
    List<GameRecordDto> recentMatches;
}

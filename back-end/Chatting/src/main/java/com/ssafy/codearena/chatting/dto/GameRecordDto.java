package com.ssafy.codearena.chatting.dto;


import lombok.Data;

@Data
public class GameRecordDto {
    String gameId;
    String problemId;
    String problemTitle;
    String player1;
    String player2;
    String player3;
    String player4;
    String gameMode;
    String winner;
    String roomType;
}

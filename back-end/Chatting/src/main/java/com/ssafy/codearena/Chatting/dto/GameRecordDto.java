package com.ssafy.codearena.Chatting.dto;


import lombok.Data;

@Data
public class GameRecordDto {
    String gameId;
    String problemTitle;
    String player1;
    String player2;
    String player3;
    String player4;
    String gameMode;
    String winner;
    String roomType;
}

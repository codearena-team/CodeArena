package com.ssafy.codearena.chatting.dto;

import lombok.Data;

@Data
public class CompetitiveWinnerInfoDto {
    private String player1;
    private String player2;
    private String winner;
    private String game_mode;
}

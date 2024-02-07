package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

@Data
public class CompetitiveManageDto {
    private int Participants;
    private String player1;
    private String player2;
    private String gamemode;
    private boolean player1_leave;
    private boolean player2_leave;
}

package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

@Data
public class CompetitiveTopMatchResultDto {
    private String gameId;
    private String player1Nickname;
    private String player2Nickname;
    private String player1Rating;
    private String player2Rating;
    private String player1Ssumnail;
    private String player2Ssumnail;
    private int Participants;
}

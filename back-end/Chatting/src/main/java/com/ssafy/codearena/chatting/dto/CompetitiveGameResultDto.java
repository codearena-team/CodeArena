package com.ssafy.codearena.chatting.dto;

import lombok.Data;

import java.util.List;

@Data
public class CompetitiveGameResultDto {
    private String winnerId;
    private String winnerRating;
    private String winnerSsumnail;
    private String loserId;
    private String loserRating;
    private String loserSsumnail;
    private List<CompetitiveGameSubmitDto> list;
}

package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

import java.util.List;

@Data
public class CompetitiveGameResultDto {
    private String winnerId;
    private String winnerRating;
    private String loserId;
    private String loserRating;
    private List<CompetitiveGameSubmitDto> list;
}

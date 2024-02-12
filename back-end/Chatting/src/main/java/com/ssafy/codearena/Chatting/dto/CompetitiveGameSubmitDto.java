package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

@Data
public class CompetitiveGameSubmitDto {
    private String submitNo;
    private String userId;
    private String userNickname;
    private String problemId;
    private String gameType;
    private String submitLang;
    private String submitStatus;
    private String timeComplexity;
    private String memory;
    private String submitDate;

}

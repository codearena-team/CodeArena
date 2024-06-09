package com.ssafy.codearena.dto;


import lombok.Data;

@Data
public class MatchDto {
    private String userId;
    private Long enqueueTime;
    private String userNickname;
    private String queueKey;
    private Boolean isOk;
    private String matchId;
}

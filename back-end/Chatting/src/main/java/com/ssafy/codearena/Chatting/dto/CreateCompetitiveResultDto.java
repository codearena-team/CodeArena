package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

@Data
public class CreateCompetitiveResultDto {
    private String gameId;
    private String problemId;
    private String viduSession;
    private String startTime;
}

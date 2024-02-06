package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

@Data
public class SubmitResultDto {
    public enum resultType {
        CONTINUE, END;
    }

    private resultType type;
    private String gameId;
    private String winner;
    private String result;
}

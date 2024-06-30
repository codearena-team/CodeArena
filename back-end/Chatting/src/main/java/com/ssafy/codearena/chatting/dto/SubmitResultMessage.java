package com.ssafy.codearena.chatting.dto;

import lombok.Data;

@Data
public class SubmitResultMessage {
    public enum resultType {
        CONTINUE, END;
    }

    private resultType type;
    private String gameId;
    private String winner;
    private String result;
}

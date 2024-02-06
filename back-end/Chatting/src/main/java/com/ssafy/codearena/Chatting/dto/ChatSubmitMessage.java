package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

@Data
public class ChatSubmitMessage {

    public enum GameMode {
        SPEED, EFFI;
    }

    private GameMode mode;
    private String gameId;
    private String sender;
    private String result;
}

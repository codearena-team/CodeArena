package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

@Data
public class ChatSubmitMessage {

    public enum MessageType {
        SPEED, EFFI;
    }

    private MessageType mode;
    private String gameId;
    private String sender;
    private String result;
}

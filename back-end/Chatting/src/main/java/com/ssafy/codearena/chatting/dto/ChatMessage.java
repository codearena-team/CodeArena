package com.ssafy.codearena.chatting.dto;


import lombok.Data;

@Data
public class ChatMessage {

    public enum MessageType {
        ENTER, TALK, START, EXIT;
    }

    private MessageType type;
    private String gameId;
    private String sender;
    private String message;
}

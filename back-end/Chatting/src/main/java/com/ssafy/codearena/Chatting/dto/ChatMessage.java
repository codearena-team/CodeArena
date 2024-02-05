package com.ssafy.codearena.Chatting.dto;


import lombok.Data;

@Data
public class ChatMessage {

    public enum MessageType {
        ENTER, TALK, EXIT
    }

    private MessageType type;
    private String gameId;
    private String sender;
    private String message;
}

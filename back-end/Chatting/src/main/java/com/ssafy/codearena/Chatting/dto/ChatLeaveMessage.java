package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

@Data
public class ChatLeaveMessage {
    public enum MessageType {
        PLAYER_EXIT, TERMINATED;
    }

    private MessageType type;
    private String gameId;
    private String mode;
    private String userId;
    private String sender;
    private String message;
}

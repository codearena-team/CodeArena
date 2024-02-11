package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

@Data
public class PlayerKickMessage {
    public enum MessageType {
        KICK;
    }
    private MessageType type;
    private String gameId;
    private String userId;
}

package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

@Data
public class ChatLeaveMessage {
    public enum LeaveType {
        PLAYER_EXIT, TERMINATED;
    }

    private LeaveType type;
    private String gameId;
    private String mode;
    private String sender;
    private String message;
}

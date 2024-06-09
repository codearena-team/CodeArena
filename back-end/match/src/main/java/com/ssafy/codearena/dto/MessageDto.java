package com.ssafy.codearena.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MessageDto {
    public enum MessageType{
        ENQUEUE, POP, YES, NO, QUERY, EXCEPTION, RESPONSE, INGAME, CONTINUE
    }
    private String queueKey;
    private String matchId;
    private MessageType type;
    private String userId;
    private String userNickname;
    private Integer rating;
    private String gameMode;
    private String lang;
    private String content;
    private String problemId;
    private String gameId;
    private String viduSession;
}

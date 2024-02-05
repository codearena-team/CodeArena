package com.ssafy.match;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MessageDto {
    public enum MessageType{
        ENQUEUE, POP, YES, NO, QUERY, EXCEPTION
    }
    private String matchId;
    private MessageType type;
    private String userId;
    private Integer rating;
    private String gameMode;
    private String lang;
    private String content;
}

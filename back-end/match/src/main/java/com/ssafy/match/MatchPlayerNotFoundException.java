package com.ssafy.match;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;

public class MatchPlayerNotFoundException extends Throwable {
    static final ObjectMapper objectMapper = new ObjectMapper();
    static TextMessage TEXT_MESSAGE ;

    static{
        MessageDto messageDto = new MessageDto();
        messageDto.setType(MessageDto.MessageType.EXCEPTION);
        messageDto.setContent("매치메이킹 플레이어 Not Found Exception");
        try {
            TEXT_MESSAGE = new TextMessage(objectMapper.writeValueAsString(messageDto));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
    TextMessage getTextMessage(){
        return TEXT_MESSAGE;
    }
}

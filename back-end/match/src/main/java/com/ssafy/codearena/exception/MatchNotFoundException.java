package com.ssafy.codearena.exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.codearena.dto.MessageDto;
import org.springframework.web.socket.TextMessage;

public class MatchNotFoundException  extends Exception {
    static final ObjectMapper objectMapper = new ObjectMapper();
    static TextMessage TEXT_MESSAGE ;

    static{
        MessageDto messageDto = new MessageDto();
        messageDto.setType(MessageDto.MessageType.EXCEPTION);
        messageDto.setContent("매치 Not Found Exception");
        try {
            TEXT_MESSAGE = new TextMessage(objectMapper.writeValueAsString(messageDto));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
    public TextMessage getTextMessage(){
        return TEXT_MESSAGE;
    }
}

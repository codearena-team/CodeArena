package com.ssafy.match;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;

public class ExpressionException extends NullPointerException{
    public ExpressionException() {
        super();
    }

    public ExpressionException(String s) {
        super(s);
    }

    static final ObjectMapper objectMapper = new ObjectMapper();
    static TextMessage TEXT_MESSAGE ;

    static{
        MessageDto messageDto = new MessageDto();
        messageDto.setType(MessageDto.MessageType.EXCEPTION);
        messageDto.setContent("null 데이터가 들어왔습니다. 데이터를 확인해주세요");
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

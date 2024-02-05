package com.ssafy.codearena.Chatting.controller;
import com.ssafy.codearena.Chatting.dto.ChatMessage;
import com.ssafy.codearena.Chatting.service.ChatService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class ChatController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatService chatService;
    @MessageMapping("chat/message")
    public void message(ChatMessage message) {
        String gameId = message.getGameId();
        //관전 채팅방 참여
        if(message.getType() == ChatMessage.MessageType.ENTER) {
            chatService.plusParticipants(gameId);
        }
        //관전 채팅방 대화 Publishing
        else if (message.getType() == ChatMessage.MessageType.TALK) {
            messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), message);
        }
        //관전 채팅방 퇴장
        else if(message.getType() == ChatMessage.MessageType.EXIT) {
            chatService.minusParticipants(gameId);
        }
    }
}
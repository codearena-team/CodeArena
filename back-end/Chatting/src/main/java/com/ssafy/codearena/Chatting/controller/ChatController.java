package com.ssafy.codearena.Chatting.controller;


import com.ssafy.codearena.Chatting.dto.ChatMessage;
import com.ssafy.codearena.Chatting.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatRoomRepository chatRoomRepository;


    @MessageMapping("chat/message")
    public void message(ChatMessage message) {

        String roomId = message.getRoomId();
        System.out.println("???");

        //관전 채팅방 참여
        if(message.getType() == ChatMessage.MessageType.ENTER) {
            chatRoomRepository.findRoomById(roomId).setParticipants(chatRoomRepository.findRoomById(roomId).getParticipants() + 1);
            System.out.println(chatRoomRepository.findRoomById(roomId).getRoomId() + chatRoomRepository.findRoomById(roomId).getParticipants());
        }

        //관전 채팅방 대화 Publishing
        else if (message.getType() == ChatMessage.MessageType.TALK) {

            messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
        }

        //관전 채팅방 퇴장
        else if(message.getType() == ChatMessage.MessageType.EXIT) {
            chatRoomRepository.findRoomById(roomId).setParticipants(chatRoomRepository.findRoomById(roomId).getParticipants() - 1);


        }
    }
}

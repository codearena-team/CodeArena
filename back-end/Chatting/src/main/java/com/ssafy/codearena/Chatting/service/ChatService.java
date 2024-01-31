package com.ssafy.codearena.Chatting.service;

import com.ssafy.codearena.Chatting.dto.ChatRoom;

import java.util.List;

public interface ChatService {
    public List<ChatRoom> findAllRoom();
    public ChatRoom findRoomById(String id);
    public void InsertRoom(String roomId, ChatRoom chatRoom);
    public int findProblemById();
}

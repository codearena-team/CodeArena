package com.ssafy.codearena.Chatting.repository;


import com.ssafy.codearena.Chatting.dto.ChatMessage;
import com.ssafy.codearena.Chatting.dto.ChatRoom;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ChatRoomRepository {

    private Map<String, ChatRoom> chatRoomMap;

    @PostConstruct
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }

    /*
    * 모든 방 리스트 찾기
    * */
    public List<ChatRoom> findAllRoom() {
        List chatRooms = new ArrayList(chatRoomMap.values());
        Collections.reverse(chatRooms);
        return chatRooms;
    }


    /*
    * 특정 방 찾기
    * */
    public ChatRoom findRoomById(String id) {
        return chatRoomMap.get(id);
    }


    /*
        게임방 신규생성 방 생성
     */
    public ChatRoom createChatRoom(String user1, String user2, String gameType, String language) {
        ChatRoom chatRoom = ChatRoom.create(user1, user2, gameType, language);
        chatRoomMap.put(chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }
}

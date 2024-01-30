package com.ssafy.codearena.Chatting.dto;


import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;

@Data
public class ChatRoom {

    private String roomId;  //게임방 ID
    private String name;    //게임방 제목
    private String user1;   //플레이어 1
    private String user2;   //플레이어 2
    private Long Participants;    //채팅 참여자 수
    private String problemId;   //배정된 랜덤 문제 번호
    private String startTime;   //게임 시작 시간
    private String gameType;    //게임 모드 2가지 (스피드전, 효율전)
    private String language;    //게임 사용 언어

    public static ChatRoom create(String user1, String user2, String gameType, String language) {
        ChatRoom chatRoom = new ChatRoom();
        //게임방 초기값 입력
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.name = user1 + " vs " + user2;
        chatRoom.user1 = user1;
        chatRoom.user2 = user2;
        chatRoom.gameType = gameType;
        chatRoom.language = language;
        chatRoom.setParticipants(0L);
        LocalDateTime localDateTime = LocalDateTime.now();
        chatRoom.startTime = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"));

        return chatRoom;
    }

}

package com.ssafy.codearena.Chatting.controller;


import com.ssafy.codearena.Chatting.dto.ChatRoom;
import com.ssafy.codearena.Chatting.repository.ChatRoomRepository;
import com.ssafy.codearena.Chatting.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatService chatService;


    //특정 채팅방 반환
    @GetMapping("/room")
    public ChatRoom room(String roomId) {
        return chatService.findRoomById(roomId);
    }

    //모든 채팅방 목록 반환
    //응답 데이터 : 모든 방 객체 리스트
    @GetMapping("/rooms")
    public List<ChatRoom> room() {
        return chatService.findAllRoom();
    }

    //채팅방 생성
    //매칭 서버에서 요청받는 엔드포인트
    @PostMapping("/gameroom")
    public ChatRoom createGameRoom(@RequestParam String user1, String user2, String gameType, String language) {

        ChatRoom chatRoom = ChatRoom.create(user1, user2, gameType, language);
        chatService.InsertRoom(chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }

    @GetMapping("/problem")
    public Map<String, String> createRandomProblem(@RequestParam String roomId) {
        ChatRoom chatRoom = chatService.findRoomById(roomId);


        //마지막 문제 번호 조회
        int LastProblemId = chatService.findProblemById();

        //랜덤 문제 생성 로직


        chatRoom.setProblemId(Integer.toString(LastProblemId));    //예시

        //응답 생성
        Map<String, String> problem = new HashMap<>();
        problem.put("problemId", Integer.toString(LastProblemId));

        return problem;
    }


}

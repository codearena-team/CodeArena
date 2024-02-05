package com.ssafy.codearena.Chatting.controller;
import com.ssafy.codearena.Chatting.dto.GameCreateDto;
import com.ssafy.codearena.Chatting.dto.GameInfoDto;
import com.ssafy.codearena.Chatting.dto.GameResultDto;
import com.ssafy.codearena.Chatting.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatService chatService;
    //특정 채팅방 반환
    @GetMapping("/room")
    public ResponseEntity<?> room(@RequestParam String gameId) {
//        log.info(gameId);
        return new ResponseEntity<GameResultDto>(chatService.findRoomById(gameId), HttpStatus.OK);
    }
    //모든 채팅방 목록 반환
    @GetMapping("/rooms")
    public ResponseEntity<?> room(@RequestParam Map<String, String> map) {
        log.info(map.get("key"));
        return new ResponseEntity<GameResultDto>(chatService.findAllRoom(map), HttpStatus.OK);
    }
    //채팅방 생성
    //매칭 서버에서 요청받는 엔드포인트
    //받는 데이터로는 RandomUUID 두 유저의 ID값, 게임 타입, 사용 언어
    //응답 데이터 :
    @PostMapping("/gameroom")
    public GameResultDto createGameRoom(@RequestBody GameCreateDto gameCreateDto) {
        return chatService.createPrivateRoom(gameCreateDto);
    }
}
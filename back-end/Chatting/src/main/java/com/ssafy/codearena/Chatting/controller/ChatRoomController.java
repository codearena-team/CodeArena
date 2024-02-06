package com.ssafy.codearena.Chatting.controller;
import com.ssafy.codearena.Chatting.dto.CreateCompetitiveResultDto;
import com.ssafy.codearena.Chatting.dto.GameCreateDto;
import com.ssafy.codearena.Chatting.dto.GameInfoDto;
import com.ssafy.codearena.Chatting.dto.GameResultDto;
import com.ssafy.codearena.Chatting.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@Tag(name = "채팅방 REST API", description = "채팅방 조회 및 생성 등 API")
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
    //관전 채팅방 생성
    //매칭 서버에서 요청받는 엔드포인트
    //받는 데이터로는 RandomUUID 두 유저의 ID값, 게임 타입, 사용 언어
    //응답 데이터 :
    @Operation(summary = "경쟁 게임방 생성 API")
    @Parameters(value = {
            @Parameter(name = "gameId", description = "매칭 ID", example = "Random.UUID"),
            @Parameter(name = "title", description = "게임방 제목", example = "player1닉네임 vs player2닉네임"),
            @Parameter(name = "userRed", description = "Player1 ID"),
            @Parameter(name = "userBlue", description = "Player2 ID"),
            @Parameter(name = "gameMode", description = "게임 모드 2가지", example = "1 : 스피드전, 2 : 효율전"),
            @Parameter(name = "language", description = "게임 사용 언어", example = "java")
    })
    @ApiResponse(description = "두 유저에게 전달될 응답 값", content = @Content(schema = @Schema(implementation = CreateCompetitiveResultDto.class)))
    @PostMapping("/gameroom")
    public GameResultDto createGameRoom(@RequestBody GameCreateDto gameCreateDto) {
        return chatService.createCompetitiveRoom(gameCreateDto);
    }


}
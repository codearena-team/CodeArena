package com.ssafy.codearena.Chatting.controller;
import com.ssafy.codearena.Chatting.dto.*;
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
import org.apache.coyote.Response;
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
    @Operation(summary = "특정 게임방 상세조회 API")
    @Parameters(value = {
            @Parameter(name = "gameId", description = "게임방 ID"),
    })
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

    @GetMapping("/exit")
    public ResponseEntity<?> exit(@RequestParam String gameId) {

        chatService.minusParticipants(gameId);
        return new ResponseEntity<String>("퇴장", HttpStatus.OK);
    }

    @GetMapping("/enter")
    public ResponseEntity<?> enter(@RequestParam String gameId) {

        chatService.plusParticipants(gameId);
        return new ResponseEntity<>("입장", HttpStatus.OK);
    }
    @GetMapping("/exit/private")
    public ResponseEntity<?> exitPrivate(@RequestParam String gameId, String userId) {

        chatService.minusCandidates(gameId, userId);
        return new ResponseEntity<String>("퇴장", HttpStatus.OK);
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

    @Operation(summary = "사설 게임방 생성 API")
    @Parameters(value = {
            @Parameter(name = "gameId", description = "매칭 ID", example = "Random.UUID"),
            @Parameter(name = "title", description = "게임방 제목", example = "알고리즘 고수들 모여라"),
            @Parameter(name = "userId", description = "방장 ID"),
            @Parameter(name = "gameMode", description = "게임 모드 2가지", example = "1 : 스피드전, 2 : 효율전"),
            @Parameter(name = "language", description = "게임 사용 언어", example = "java"),
    })
    @ApiResponse(description = "두 유저에게 전달될 응답 값", content = @Content(schema = @Schema(implementation = CreateCompetitiveResultDto.class)))
    @PostMapping("/gameroom/private")
    public GameResultDto createPrivateGameRoom(@RequestBody PrivateGameCreateDto privateGameCreateDto) {
        return chatService.createPrivateRoom(privateGameCreateDto);
    }

    @GetMapping("/hotmatch")
    public List<CompetitiveTopMatchResultDto> getTopMatch() {
        List<CompetitiveTopMatchResultDto> list = chatService.getTopFiveMatch();

        return list;

    }

    @Operation(summary = "사설 게임방 입장 가능 여부 조회 API")
    @Parameter(name = "gameId", description = "참여하려는 게임방의 ID")
    @ApiResponse(content = @Content(schema = @Schema(implementation = RestResultDto.class)))
    @GetMapping("/enter/room")
    public ResponseEntity<?> isEnter(@RequestParam String gameId) {

        return new ResponseEntity<RestResultDto>(chatService.getCandidates(gameId), HttpStatus.OK);
    }

    @Operation(summary = "경쟁 게임방 결과 조회 API")
    @Parameter(name = "gameId")
    @GetMapping("/result")
    public ResponseEntity<?> whoWinner(@RequestParam String gameId) {

        return new ResponseEntity<GameResultDto>(chatService.whoWinner(gameId), HttpStatus.OK);
    }

}
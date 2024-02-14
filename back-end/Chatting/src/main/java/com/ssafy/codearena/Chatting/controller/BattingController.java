package com.ssafy.codearena.Chatting.controller;


import com.ssafy.codearena.Chatting.dto.BatStatusDto;
import com.ssafy.codearena.Chatting.service.BattingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/batting")
@RequiredArgsConstructor
public class BattingController {

    private final BattingService battingService;

    @Operation(summary = "배팅 API", description = "특정 유저에게 N금액만큼 배팅하는 로직")
    @Parameters(value = {
            @Parameter(name = "gameId", description = "게임방 ID"),
            @Parameter(name = "userId", description = "배팅하는 유저 ID"),
            @Parameter(name = "playerId", description = "배팅하려는 플레이어 ID"),
            @Parameter(name = "batCoin", description = "배팅하려는 금액")
    })
    @PostMapping("/player")
    public ResponseEntity<?> batPlayer(@RequestParam Map<String, String> map) {

        return new ResponseEntity<>(battingService.batPlayer(map), HttpStatus.OK);
    }

    @Operation(summary = "배팅 현황 조회 API", description = "게임방의 배팅 현황 조회 API")
    @Parameters(value = {
            @Parameter(name = "gameId", description = "게임방 ID"),
            @Parameter(name = "player1Id", description = "플레이어1 ID"),
            @Parameter(name = "player2Id", description = "플레이어2 ID")
    })
    @ApiResponse(content = @Content(schema = @Schema(implementation = BatStatusDto.class)))
    @GetMapping("/status")
    public ResponseEntity<?> getBatStatus(@RequestParam Map<String, String> map) {

        return new ResponseEntity<>(battingService.getBatStatus(map), HttpStatus.OK);
    }

}

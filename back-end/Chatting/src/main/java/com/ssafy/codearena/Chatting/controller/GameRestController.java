package com.ssafy.codearena.Chatting.controller;

import com.ssafy.codearena.Chatting.dto.CompetitiveResultDto;
import com.ssafy.codearena.Chatting.dto.GameResultDto;
import com.ssafy.codearena.Chatting.dto.RestResultDto;
import com.ssafy.codearena.Chatting.dto.SubmitDto;
import com.ssafy.codearena.Chatting.service.RestService;
import jakarta.servlet.http.HttpServletRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/rest")
@RequiredArgsConstructor
public class GameRestController {

    private final RestService service;
    @PostMapping("/submit")
    ResponseEntity<RestResultDto> submitEff(@RequestBody SubmitDto submitDto) {
        // roomType 0 : 경쟁, roomType : 1 사설
        RestResultDto resultDto = service.insertSubmit(submitDto);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    @GetMapping("/rank")
    ResponseEntity<RestResultDto> getRanking() {
        RestResultDto resultDto = service.getRanking();
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    @GetMapping("/user/record")
    ResponseEntity<RestResultDto> getRecords(HttpServletRequest request){
        RestResultDto resultDto = service.getMyRecord(request);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    @Operation(summary = "경쟁전 게임결과 조회 API", description = "스피드전 효율전 상관없이 gameId로 해당 정보 조회")
    @Parameter(name = "gameId", description = "결과 조회하려는 게임방 ID")
    @ApiResponse(responseCode = "200", description = "두 플레이어에 대한 정보까지 한번에 조회", content = @Content(schema = @Schema(implementation = CompetitiveResultDto.class)))
    @GetMapping("/competitive/result/{gameId}")
    ResponseEntity<?> getCompetitiveResult(@PathVariable String gameId) {

        return new ResponseEntity<RestResultDto>(service.getCompetitiveResult(gameId), HttpStatus.OK);
    }

    @GetMapping("/effi/list")
    ResponseEntity<?> getEffiSubmitList(@RequestParam Map<String, String> map) {

        return new ResponseEntity<GameResultDto>(service.getEffiSubmitList(map), HttpStatus.OK);
    }
}

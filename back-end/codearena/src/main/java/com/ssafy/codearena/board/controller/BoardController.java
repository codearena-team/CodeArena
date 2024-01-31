package com.ssafy.codearena.board.controller;


import com.ssafy.codearena.board.dto.BoardDetailDto;
import com.ssafy.codearena.board.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;


@Tag(name = "게시판 API", description = "게시판 관련 API")
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;


    @Operation(summary = "게시판 상세조회")
    @Parameter(name = "boardId", description = "상세보기 할 게시판의 번호")
    @GetMapping("/detail")
    public BoardDetailDto boardDetail(String boardId) {

        return boardService.boardDetail(boardId);
    }

}

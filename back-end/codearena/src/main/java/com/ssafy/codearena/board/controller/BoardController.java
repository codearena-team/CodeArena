package com.ssafy.codearena.board.controller;


import com.ssafy.codearena.board.dto.BoardDetailDto;
import com.ssafy.codearena.board.dto.BoardResultDto;
import com.ssafy.codearena.board.dto.BoardWriteDto;
import com.ssafy.codearena.board.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;


@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/board")
public class BoardController implements BoardControllerDocs{

    private final BoardService boardService;


    @Override
    @GetMapping("/detail/{boardId}")
    public ResponseEntity<?> boardDetail(@PathVariable String boardId) {

        return new ResponseEntity<BoardResultDto>(boardService.boardDetail(boardId), HttpStatus.OK);
    }

    @Override
    @PostMapping("/write")
    public ResponseEntity<?> boardWrite(@RequestBody BoardWriteDto boardWriteDto) {

        return new ResponseEntity<BoardResultDto>(boardService.boardWrite(boardWriteDto), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/delete/{boardId}")
    public ResponseEntity<?> boardDelete(@PathVariable String boardId) {

        return new ResponseEntity<BoardResultDto>(boardService.boardDelete(boardId), HttpStatus.OK);
    }

}

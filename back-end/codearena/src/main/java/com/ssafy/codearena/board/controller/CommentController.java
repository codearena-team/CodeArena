package com.ssafy.codearena.board.controller;

import com.ssafy.codearena.board.dto.CommentResultDto;
import com.ssafy.codearena.board.dto.CommentUpdateDto;
import com.ssafy.codearena.board.dto.CommentWriteDto;
import com.ssafy.codearena.board.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/comment")
public class CommentController implements CommentControllerDocs{

    private final CommentService commentService;

    @Override
    @PostMapping("/write")
    public ResponseEntity<?> commentWrite(@RequestBody CommentWriteDto commentWriteDto) {

        log.info(String.valueOf(commentWriteDto));
        return new ResponseEntity<CommentResultDto>(commentService.commentWrite(commentWriteDto), HttpStatus.OK);
    }

    @Override
    @GetMapping("/list")
    public ResponseEntity<?> commentList(@RequestParam String articleNo) {

        return new ResponseEntity<CommentResultDto>(commentService.commentList(articleNo), HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/delete")
    public ResponseEntity<?> commentDelete(@RequestParam String commentId) {

        return new ResponseEntity<CommentResultDto>(commentService.commentDelete(commentId), HttpStatus.OK);
    }

    @Override
    @PutMapping("/update")
    public ResponseEntity<?> commentUpdate(@RequestBody CommentUpdateDto commentUpdateDto) {

        return new ResponseEntity<CommentResultDto>(commentService.commentUpdate(commentUpdateDto), HttpStatus.OK);
    }

}

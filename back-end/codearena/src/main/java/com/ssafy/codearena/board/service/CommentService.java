package com.ssafy.codearena.board.service;

import com.ssafy.codearena.board.dto.CommentResultDto;
import com.ssafy.codearena.board.dto.CommentUpdateDto;
import com.ssafy.codearena.board.dto.CommentWriteDto;

public interface CommentService {
    public CommentResultDto commentWrite(CommentWriteDto commentWriteDto);
    public CommentResultDto commentList(String articleNo);
    public CommentResultDto commentDelete(String commentId);
    public CommentResultDto commentUpdate(CommentUpdateDto commentUpdateDto);
}

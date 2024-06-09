package com.ssafy.codearena.board.mapper;

import com.ssafy.codearena.board.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {
    public void commentWrite(CommentWriteDto commentWriteDto) throws Exception;
    public List<CommentListDto> commentList(String articleNo) throws Exception;
    public void commentDelete(String commentId) throws Exception;
    public void commentUpdate(CommentUpdateDto commentUpdateDto) throws Exception;
}

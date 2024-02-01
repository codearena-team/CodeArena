package com.ssafy.codearena.board.service;

import com.ssafy.codearena.board.dto.CommentListDto;
import com.ssafy.codearena.board.dto.CommentResultDto;
import com.ssafy.codearena.board.dto.CommentUpdateDto;
import com.ssafy.codearena.board.dto.CommentWriteDto;
import com.ssafy.codearena.board.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class CommentServiceImpl implements CommentService{

    private final CommentMapper commentMapper;

    @Override
    public CommentResultDto commentWrite(CommentWriteDto commentWriteDto) {

        CommentResultDto commentResultDto = new CommentResultDto();

        commentResultDto.setStatus("201");
        commentResultDto.setMsg("답글 작성 성공");
        commentResultDto.setData(null);

        try {

            log.info(String.valueOf(commentWriteDto));
            commentMapper.commentWrite(commentWriteDto);
        }
        catch (Exception e) {
            e.printStackTrace();
            commentResultDto.setStatus("500");
            commentResultDto.setMsg("Server Internal Error");
        }

        return commentResultDto;
    }

    @Override
    public CommentResultDto commentList(String articleNo) {

        CommentResultDto commentResultDto = new CommentResultDto();

        commentResultDto.setStatus("200");
        commentResultDto.setMsg("답글 조회 성공");

        try {

            List<CommentListDto> list = commentMapper.commentList(articleNo);
            commentResultDto.setData(list);
        }
        catch (Exception e) {

            commentResultDto.setStatus("500");
            commentResultDto.setMsg("Server Internal Error");
            commentResultDto.setData(null);
        }


        return commentResultDto;
    }

    @Override
    public CommentResultDto commentDelete(String commentId) {

        CommentResultDto commentResultDto = new CommentResultDto();

        commentResultDto.setStatus("200");
        commentResultDto.setMsg("답글 삭제 성공");
        commentResultDto.setData(null);

        try {

            commentMapper.commentDelete(commentId);
        }
        catch (Exception e) {

            commentResultDto.setStatus("500");
            commentResultDto.setMsg("Server Internal Error");
        }

        return commentResultDto;
    }

    @Override
    public CommentResultDto commentUpdate(CommentUpdateDto commentUpdateDto) {

        CommentResultDto commentResultDto = new CommentResultDto();

        commentResultDto.setStatus("200");
        commentResultDto.setMsg("답글 수정 성공");
        commentResultDto.setData(null);
        try {

            commentMapper.commentUpdate(commentUpdateDto);
        }
        catch (Exception e) {

            commentResultDto.setStatus("500");
            commentResultDto.setMsg("Server Internal Error");
        }

        return commentResultDto;
    }
}

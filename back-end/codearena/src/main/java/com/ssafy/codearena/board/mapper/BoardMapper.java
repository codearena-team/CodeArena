package com.ssafy.codearena.board.mapper;

import com.ssafy.codearena.board.dto.BoardDetailDto;
import com.ssafy.codearena.board.dto.BoardListDto;
import com.ssafy.codearena.board.dto.BoardUpdateDto;
import com.ssafy.codearena.board.dto.BoardWriteDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface BoardMapper {
    public BoardDetailDto boardDetail(String boardId) throws Exception;
    public void boardWrite(BoardWriteDto boardWriteDto) throws Exception;
    public void boardDelete(String boardId) throws Exception;
    public void boardUpdate(BoardUpdateDto boardUpdateDto) throws Exception;
    public List<BoardDetailDto> boardList(Map<String, Object> param) throws Exception;
    public int getTotalBoardCount(Map<String, Object> param) throws Exception;
    public void hitUpdate(String boardId) throws Exception;
}

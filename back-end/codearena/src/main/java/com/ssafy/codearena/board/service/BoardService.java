package com.ssafy.codearena.board.service;


import com.ssafy.codearena.board.dto.BoardDetailDto;
import com.ssafy.codearena.board.dto.BoardResultDto;
import com.ssafy.codearena.board.dto.BoardWriteDto;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface BoardService {
    public BoardResultDto boardDetail(String boardId);
    public List<BoardDetailDto> boardList(Map<String, String> map);
    public BoardResultDto boardWrite(BoardWriteDto boardWriteDto);
    public void updateHit(String boardId);
    public void boardUpdate(BoardWriteDto boardUpdateDto);
    public void boardDelete(String boardId);

}

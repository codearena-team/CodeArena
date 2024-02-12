package com.ssafy.codearena.board.service;


import com.ssafy.codearena.board.dto.BoardDetailDto;
import com.ssafy.codearena.board.dto.BoardResultDto;
import com.ssafy.codearena.board.dto.BoardUpdateDto;
import com.ssafy.codearena.board.dto.BoardWriteDto;
import jakarta.servlet.http.HttpServletRequest;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface BoardService {
    public BoardResultDto boardDetail(String boardId, HttpServletRequest request);
    public BoardResultDto boardList(Map<String, String> map);
    public BoardResultDto boardWrite(BoardWriteDto boardWriteDto);
    public BoardResultDto boardUpdate(BoardUpdateDto boardUpdateDto);
    public BoardResultDto boardDelete(String boardId);

}

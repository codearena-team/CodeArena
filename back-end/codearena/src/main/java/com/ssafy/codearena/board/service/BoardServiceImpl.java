package com.ssafy.codearena.board.service;

import com.ssafy.codearena.board.dto.BoardDetailDto;
import com.ssafy.codearena.board.dto.BoardResultDto;
import com.ssafy.codearena.board.dto.BoardWriteDto;
import com.ssafy.codearena.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class BoardServiceImpl implements BoardService{

    private final BoardMapper boardMapper;


    @Override
    public BoardDetailDto boardDetail(String boardId) {

        BoardResultDto boardResultDto = new BoardResultDto();

        try {
            BoardDetailDto boardDetailDto = boardMapper.boardDetail(boardId);
            boardResultDto.setStatus("200");
            boardResultDto.setMsg("조회 성공");
            boardResultDto.setData(boardDetailDto);
        }
        catch (SQLException e) {
            boardResultDto.setStatus("404");
            boardResultDto.setMsg("SQL Error");
        }
        catch (Exception e) {
            boardResultDto.setStatus("500");
            boardResultDto.setMsg("Server Internal Error");
        }


        BoardDetailDto BoardDetailDto = null;
        return BoardDetailDto;
    }

    @Override
    public List<BoardDetailDto> boardList(Map<String, String> map) {
        return null;
    }

    @Override
    public void boardWrite(BoardWriteDto boardWriteDto) {

    }

    @Override
    public void updateHit(String boardId) {

    }

    @Override
    public void boardUpdate(BoardWriteDto boardUpdateDto) {

    }

    @Override
    public void boardDelete(String boardId) {

    }
}

package com.ssafy.codearena.board.mapper;

import com.ssafy.codearena.board.dto.BoardDetailDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;

@Mapper
public interface BoardMapper {
    public BoardDetailDto boardDetail(String boardId) throws SQLException;
}

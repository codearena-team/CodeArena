package com.ssafy.codearena.Chatting.mapper;


import com.ssafy.codearena.Chatting.dto.SubmitDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;

@Mapper
public interface RestMapper {
    void insertSubmit(SubmitDto submitDto) throws SQLException;
}

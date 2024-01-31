package com.ssafy.codearena.Chatting.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GameMapper {
    public int findProblemById();
}

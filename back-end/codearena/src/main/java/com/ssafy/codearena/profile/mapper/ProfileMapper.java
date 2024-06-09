package com.ssafy.codearena.profile.mapper;

import com.ssafy.codearena.profile.dto.ProfileDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;

@Mapper
public interface ProfileMapper {
    int putProfile(String url, String userId) throws SQLException;
    ProfileDto getProfile(String userId) throws SQLException;
}

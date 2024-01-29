package com.ssafy.codearena.alarm.mapper;

import com.ssafy.codearena.alarm.dto.AlarmReceiveDto;
import com.ssafy.codearena.alarm.dto.AlarmSendDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AlarmMapper {
    List<AlarmReceiveDto> receive(String userId);
    int send(AlarmSendDto alarmSendDto);
}

package com.ssafy.codearena.alarm.mapper;

import com.ssafy.codearena.alarm.dto.AlarmReceiveDto;
import com.ssafy.codearena.alarm.dto.AlarmSendDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AlarmMapper {
    List<AlarmReceiveDto> receive(String userId) throws Exception;
    List<AlarmReceiveDto> sendList(String userId) throws  Exception;
    void send(AlarmSendDto alarmSendDto) throws  Exception;
    AlarmReceiveDto detail(String alarmId) throws  Exception;
    void readChange(String alarmId) throws  Exception;
    void statusChange(String alarmId, String alarmStatus) throws  Exception;
}

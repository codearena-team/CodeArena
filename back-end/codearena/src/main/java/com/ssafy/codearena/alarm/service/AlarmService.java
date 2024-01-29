package com.ssafy.codearena.alarm.service;

import com.ssafy.codearena.alarm.dto.AlarmReceiveDto;
import com.ssafy.codearena.alarm.dto.AlarmSendDto;

import java.util.List;

public interface AlarmService {
    List<AlarmReceiveDto> receive(String userId);
    List<AlarmReceiveDto> sendList(String userId);
    int send(AlarmSendDto alarmSendDto);
    AlarmReceiveDto detail(String alarmId);
    void readChange(String alarmId);
    void statusChange(String alarmId, String alarmStatus);

}

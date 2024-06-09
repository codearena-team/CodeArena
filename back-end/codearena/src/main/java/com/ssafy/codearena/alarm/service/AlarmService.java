package com.ssafy.codearena.alarm.service;

import com.ssafy.codearena.alarm.dto.AlarmReceiveDto;
import com.ssafy.codearena.alarm.dto.AlarmResultDto;
import com.ssafy.codearena.alarm.dto.AlarmSendDto;

import java.util.List;

public interface AlarmService {
    AlarmResultDto receive(String userId);
    AlarmResultDto sendList(String userId);
    AlarmResultDto send(AlarmSendDto alarmSendDto);
    AlarmResultDto detail(String alarmId);
    AlarmResultDto readChange(String alarmId);
    AlarmResultDto statusChange(String alarmId, String alarmStatus);

}

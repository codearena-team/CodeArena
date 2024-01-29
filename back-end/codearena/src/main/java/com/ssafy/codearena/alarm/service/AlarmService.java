package com.ssafy.codearena.alarm.service;

import com.ssafy.codearena.alarm.dto.AlarmReceiveDto;

import java.util.List;

public interface AlarmService {
    List<AlarmReceiveDto> receive(String userId);
}

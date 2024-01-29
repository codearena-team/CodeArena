package com.ssafy.codearena.alarm.service;

import com.ssafy.codearena.alarm.dto.AlarmReceiveDto;
import com.ssafy.codearena.alarm.dto.AlarmSendDto;
import com.ssafy.codearena.alarm.mapper.AlarmMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService{

    private final AlarmMapper alarmMapper;

    @Override
    public List<AlarmReceiveDto> receive(String userId) {
        return alarmMapper.receive(userId);
    }

    @Override
    public List<AlarmReceiveDto> sendList(String userId) {
        return alarmMapper.sendList(userId);
    }

    @Override
    public int send(AlarmSendDto alarmSendDto) {
        return alarmMapper.send(alarmSendDto);
    }

    @Override
    public AlarmReceiveDto detail(String alarmId) {
        return alarmMapper.detail(alarmId);
    }

    @Override
    public void readChange(String alarmId) {
        alarmMapper.readChange(alarmId);
    }

    @Override
    public void statusChange(String alarmId, String alarmStatus) {
        alarmMapper.statusChange(alarmId, alarmStatus);
    }
}

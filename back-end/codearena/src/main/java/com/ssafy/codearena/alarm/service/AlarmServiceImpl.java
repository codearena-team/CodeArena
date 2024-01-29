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
    public int send(AlarmSendDto alarmSendDto) {
        return alarmMapper.send(alarmSendDto);
    }
}

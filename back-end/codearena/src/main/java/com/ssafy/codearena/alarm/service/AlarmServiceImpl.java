package com.ssafy.codearena.alarm.service;

import com.ssafy.codearena.alarm.dto.AlarmReceiveDto;
import com.ssafy.codearena.alarm.dto.AlarmResultDto;
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
    public AlarmResultDto receive(String userId) {

        AlarmResultDto alarmResultDto = new AlarmResultDto();

        alarmResultDto.setStatus("200");
        alarmResultDto.setMsg("수신함 조회 성공");
        alarmResultDto.setData(null);

        try {
            List<AlarmReceiveDto> alarmReceiveDtoList = alarmMapper.receive(userId);
            alarmResultDto.setData(alarmReceiveDtoList);
        }
        catch (Exception e) {
            alarmResultDto.setStatus("500");
            alarmResultDto.setMsg("조회 실패");
        }


        return alarmResultDto;
    }

    @Override
    public AlarmResultDto sendList(String userId) {

        AlarmResultDto alarmResultDto = new AlarmResultDto();

        alarmResultDto.setStatus("200");
        alarmResultDto.setMsg("송신함 조회 성공");
        alarmResultDto.setData(null);

        try {
            List<AlarmReceiveDto> alarmReceiveDtoList = alarmMapper.sendList(userId);
            alarmResultDto.setData(alarmReceiveDtoList);
        }
        catch (Exception e) {
            alarmResultDto.setStatus("500");
            alarmResultDto.setMsg("조회 실패");
        }


        return alarmResultDto;

    }

    @Override
    public AlarmResultDto send(AlarmSendDto alarmSendDto) {

        AlarmResultDto alarmResultDto = new AlarmResultDto();

        alarmResultDto.setStatus("201");
        alarmResultDto.setMsg("알림 송신 성공");
        alarmResultDto.setData(null);

        try {
            if(alarmSendDto.getAlarmType() == 1 || alarmSendDto.getAlarmType() == 2) {
                alarmSendDto.setAlarmStatus("요청 대기");
            }
            else {
                alarmSendDto.setAlarmStatus("처리 완료");
            }

            alarmMapper.send(alarmSendDto);

        }
        catch (Exception e) {
            alarmResultDto.setStatus("500");
            alarmResultDto.setMsg("송신 실패");
        }


        return alarmResultDto;

    }

    @Override
    public AlarmResultDto detail(String alarmId) {

        AlarmResultDto alarmResultDto = new AlarmResultDto();

        alarmResultDto.setStatus("200");
        alarmResultDto.setMsg("알림 상세 내용 조회 성공");
        alarmResultDto.setData(null);

        try {

            AlarmReceiveDto alarmReceiveDto = alarmMapper.detail(alarmId);
            alarmResultDto.setData(alarmReceiveDto);

        }
        catch (Exception e) {
            alarmResultDto.setStatus("500");
            alarmResultDto.setMsg("조회 실패");
        }


        return alarmResultDto;

    }

    @Override
    public AlarmResultDto readChange(String alarmId) {
        AlarmResultDto alarmResultDto = new AlarmResultDto();

        alarmResultDto.setStatus("201");
        alarmResultDto.setMsg("알림 읽음처리 성공");
        alarmResultDto.setData(null);

        try {

            alarmMapper.readChange(alarmId);

        }
        catch (Exception e) {
            alarmResultDto.setStatus("500");
            alarmResultDto.setMsg("변경 실패");
        }


        return alarmResultDto;

    }

    @Override
    public AlarmResultDto statusChange(String alarmId, String alarmStatus) {

        AlarmResultDto alarmResultDto = new AlarmResultDto();

        alarmResultDto.setStatus("201");
        alarmResultDto.setMsg("알림 상태변경 성공");
        alarmResultDto.setData(null);

        try {

            alarmMapper.statusChange(alarmId, alarmStatus);

        }
        catch (Exception e) {
            alarmResultDto.setStatus("500");
            alarmResultDto.setMsg("변경 실패");
        }


        return alarmResultDto;

    }
}

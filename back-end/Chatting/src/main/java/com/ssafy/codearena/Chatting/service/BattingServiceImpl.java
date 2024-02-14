package com.ssafy.codearena.Chatting.service;

import com.ssafy.codearena.Chatting.dto.BatPlayerCountDto;
import com.ssafy.codearena.Chatting.dto.BatStatusDto;
import com.ssafy.codearena.Chatting.dto.RestResultDto;
import com.ssafy.codearena.Chatting.mapper.BattingMapper;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class BattingServiceImpl implements BattingService{

    private final BattingMapper battingMapper;

    @Override
    public RestResultDto batPlayer(Map<String, String> map) {

        RestResultDto resultDto = new RestResultDto();
        resultDto.setStatus("201");
        resultDto.setMsg("배팅 성공");
        resultDto.setData(null);

        try {

            int userCoin = battingMapper.getUserCoin(map.get("userId"));   //해당 유저의 현재 코인 조회

            // 차감된 유저 코인 금액 적용
            String batCoin = map.get("batCoin");
            String changeCoin = Integer.toString(userCoin - Integer.parseInt(batCoin));
            battingMapper.updateUserCoin(map.get("userId"), changeCoin);

            // 배팅 기록
            battingMapper.batPlayer(map);
        }
        catch (Exception e) {

            resultDto.setStatus("500");
            resultDto.setMsg("Server Internal Error");
            log.error("Exception Msg", e);
        }

        return resultDto;
    }


    @Override
    public RestResultDto getBatStatus(Map<String, String> map) {

        RestResultDto resultDto = new RestResultDto();
        resultDto.setStatus("200");
        resultDto.setMsg("배팅현황 조회 성공");

        try {
            //배팅 현황 필요 데이터 :
            //각각 플레이어의 투자인원 조회
            BatStatusDto batStatusDto = new BatStatusDto();

            BatPlayerCountDto batPlayerCountDto = battingMapper.getPlayerCount(map);

            //총 투자 인원
            double sum = batPlayerCountDto.getPlayer1Count() + batPlayerCountDto.getPlayer2Count(); //115명

            double player1_ratio = (double)1 - ((double) batPlayerCountDto.getPlayer2Count()/sum);   //1 -> 0.3 >> 30%
            double player2_ratio = (double)1 - ((double) batPlayerCountDto.getPlayer1Count()/sum);   //1 -> 0.3 >> 30%

            int player1Ratio = (int) Math.round(player1_ratio*100);
            int player2Ratio = (int) Math.round(player2_ratio*100);

            log.info("플레이어 1의 비율 : " + player1_ratio);
            log.info("플레이어 2의 비율 : " + player2_ratio);
            batStatusDto.setPlayer1Ratio(String.valueOf(player1Ratio));
            batStatusDto.setPlayer2Ratio(String.valueOf(player2Ratio));

            resultDto.setData(batStatusDto);
        }
        catch (Exception e) {

            log.error("Exception Msg", e);
            resultDto.setStatus("500");
            resultDto.setMsg("Server Internal Error");
            resultDto.setData(null);

        }

        return resultDto;
    }

    @Override
    public RestResultDto commitBatResult(String gameId, String winner) {
        return null;
    }
}

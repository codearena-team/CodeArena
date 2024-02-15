package com.ssafy.codearena.Chatting.service;

import com.ssafy.codearena.Chatting.dto.*;
import com.ssafy.codearena.Chatting.mapper.BattingMapper;
import com.ssafy.codearena.Chatting.mapper.GameMapper;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
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

            log.info("유저가 배팅 시도를 했습니다!");
            log.info(map.get("userId"));
            log.info(map.get("gameId"));

            //유저가 배팅한 기록이 있는지 조회
            int cnt = battingMapper.getUserBatStatus(map.get("gameId"), map.get("userId"));

            if(cnt > 0) {

                throw new Error("배팅을 1회이상 시도하였습니다.");
            }

            int userCoin = battingMapper.getUserCoin(map.get("userId"));   //해당 유저의 현재 코인 조회

            //가지고 있는 금액보다 높게 배팅할 시
            if(Integer.parseInt(map.get("batCoin")) > userCoin) {

                throw new Error("Error : 현재 보유중인 코인보다 높은 배팅");
            }
            // 차감된 유저 코인 금액 적용
            String batCoin = map.get("batCoin");
            String changeCoin = Integer.toString(userCoin - Integer.parseInt(batCoin));
            battingMapper.updateUserCoin(map.get("userId"), changeCoin);

            // 배팅 기록
            battingMapper.batPlayer(map);
        }
        catch (Error e) {

            log.error("Exception Msg", e);
            resultDto.setStatus("500");
            resultDto.setMsg(String.valueOf(e));
            resultDto.setData(null);
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

            //최고 금액 투자한 유저 조회
            MaxBatUserInfoDto playerInfo = battingMapper.getMaxBatUser(map.get("gameId"), map.get("player1Id"));

            if(playerInfo != null) {
                batStatusDto.setPlayer1MaxUserNickname(playerInfo.getUserNickname());
                batStatusDto.setPlayer1MaxCoin(playerInfo.getUserCoin());
            }

            playerInfo = battingMapper.getMaxBatUser(map.get("gameId"), map.get("player2Id"));
            if(playerInfo != null) {
                batStatusDto.setPlayer2MaxUserNickname(playerInfo.getUserNickname());
                batStatusDto.setPlayer2MaxCoin(playerInfo.getUserCoin());
            }

            //각 플레이어에게 건 사람의 총합 조회
            int player1Cnt = battingMapper.getPlayerSumPeople(map.get("gameId"), map.get("player1Id"));
            batStatusDto.setPlayer1BatPeople(String.valueOf(player1Cnt));

            int player2Cnt = battingMapper.getPlayerSumPeople(map.get("gameId"), map.get("player2Id"));
            batStatusDto.setPlayer2BatPeople(String.valueOf(player2Cnt));

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


}

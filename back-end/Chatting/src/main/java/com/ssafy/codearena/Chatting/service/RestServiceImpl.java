package com.ssafy.codearena.Chatting.service;

import com.ssafy.codearena.Chatting.dto.CompetitiveResultDto;
import com.ssafy.codearena.Chatting.dto.CompetitiveUserInfoDto;
import com.ssafy.codearena.Chatting.dto.RestResultDto;
import com.ssafy.codearena.Chatting.dto.SubmitDto;
import com.ssafy.codearena.Chatting.mapper.RestMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class RestServiceImpl implements RestService {

    private final RestMapper mapper;

    @Value("${judge.java.url}")
    private String judgejava;
    @Value("${judge.cpp.url}")
    private String judgecpp;
    @Value("${judge.python.url}")
    private String judgepython;

    private WebClient getClient(String lang){
        switch(lang){
            case "java":
                return WebClient.create(judgejava);
            case "cpp":
                return WebClient.create(judgecpp);
            default:
                return WebClient.create(judgepython);
        }
    }

    @Override
    public RestResultDto insertSubmit(SubmitDto submitDto) {
        RestResultDto resultDto = new RestResultDto();
        resultDto.setStatus("200");
        resultDto.setMsg("채점서버로 전송되었습니다.");
        try{
            // /judge/arena
            submitDto.setSubmitStatus("채점중");
            mapper.insertSubmit(submitDto);
            WebClient client = getClient(submitDto.getSubmitLang());
            HashMap<String, String> params = new HashMap<>();
            params.put("submitNo", submitDto.getSubmitNo());
            params.put("problemId", submitDto.getProblemId());
            params.put("code", submitDto.getCode());
            params.put("gameType", submitDto.getGameType());
            log.debug("params : {} ", params);
            client.post().uri("/judge/arena").contentType(MediaType.APPLICATION_JSON).bodyValue(params).retrieve().bodyToMono(HashMap.class).subscribe();
        }catch(Exception e){
            log.debug("exception : {}", e);
            resultDto.setMsg("채점서버로 전송 중 에러가 발생하였습니다.");
            resultDto.setStatus("500");
        }finally{
            return resultDto;
        }

    }

    @Override
    public RestResultDto getCompetitiveResult(String gameId) {

        RestResultDto resultDto = new RestResultDto();
        resultDto.setStatus("200");
        resultDto.setMsg(gameId + "게임에 대한 결과가 조회되었습니다.");

        CompetitiveResultDto competitiveResultDto = new CompetitiveResultDto();
        competitiveResultDto.setGameId(gameId);

        //arena_record에서 gameId에 해당하는 방에 대한 정보 조회
        try {
            competitiveResultDto = mapper.getGameInfo(gameId);
        }
        catch (Exception e) {

            log.error("Exception Msg", e);
            resultDto.setStatus("500");
            resultDto.setMsg("게임방 정보 조회 시 에러가 발생했습니다.");
            resultDto.setData(null);
            return resultDto;
        }

        //user에서 각 유저에 대한 정보 조회
        try {
            //player1, DTO 재활용
            CompetitiveUserInfoDto competitiveUserInfoDto = mapper.getPlayerInfo(competitiveResultDto.getPlayer1Id(), competitiveResultDto.getGameMode());
            competitiveResultDto.setPlayer1Nickname(competitiveUserInfoDto.getUserNickname());
            competitiveResultDto.setPlayer1Rating(competitiveUserInfoDto.getUserRating());
            //player2, DTO 재활용
            competitiveUserInfoDto = mapper.getPlayerInfo(competitiveResultDto.getPlayer2Id(), competitiveResultDto.getGameMode());
            competitiveResultDto.setPlayer2Nickname(competitiveUserInfoDto.getUserNickname());
            competitiveResultDto.setPlayer2Rating(competitiveUserInfoDto.getUserRating());

            resultDto.setData(competitiveResultDto);
        }
        catch (Exception e) {

            log.error("Exception Msg", e);
            resultDto.setStatus("500");
            resultDto.setMsg("플레이어 정보 조회 시 에러가 발생했습니다.");
            resultDto.setData(null);
        }

        //winner 닉네임으로 대체
        if(competitiveResultDto.getPlayer1Id().equals(competitiveResultDto.getWinner())) {
            competitiveResultDto.setWinner(competitiveResultDto.getPlayer1Nickname());
        }
        else if(competitiveResultDto.getPlayer2Id().equals(competitiveResultDto.getWinner())) {
            competitiveResultDto.setWinner(competitiveResultDto.getPlayer2Nickname());
        }
        else {
            //무승부
            competitiveResultDto.setWinner("무승부");
        }

        return resultDto;

    }
}

package com.ssafy.codearena.Chatting.service;

import com.ssafy.codearena.Chatting.dto.GamePlayerDto;
import com.ssafy.codearena.Chatting.dto.RestResultDto;
import com.ssafy.codearena.Chatting.dto.SubmitDto;
import com.ssafy.codearena.Chatting.dto.Top5RatingResultDto;
import com.ssafy.codearena.Chatting.mapper.RestMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;

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
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public RestResultDto getRanking() {
        RestResultDto resultDto = new RestResultDto();
        Top5RatingResultDto rank = new Top5RatingResultDto();
        List<GamePlayerDto> effRanking = Collections.EMPTY_LIST;
        List<GamePlayerDto> speedRanking = Collections.EMPTY_LIST;
        resultDto.setStatus("200");
        resultDto.setMsg("순위조회에 성공했습니다.");
        try{
            effRanking = mapper.getEffRankingbyRating();
            speedRanking = mapper.getSpeedRankingByRating();
            if(effRanking == null && speedRanking == null) throw new Exception("랭크 조회 에러");
            if(effRanking == null) effRanking = Collections.EMPTY_LIST;
            if(speedRanking == null) speedRanking = Collections.EMPTY_LIST;
        }catch(Exception e){
            log.debug("exception : {}", e);
            resultDto.setStatus("500");
            resultDto.setMsg("순위조회 도중 에러가 발생했습니다.");
        }finally{
            rank.setSpeedRank(speedRanking);
            rank.setEffRank(effRanking);
            resultDto.setData(rank);
            return resultDto;
        }
    }
}

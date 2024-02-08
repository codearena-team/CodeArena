package com.ssafy.codearena.Chatting.service;

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
}

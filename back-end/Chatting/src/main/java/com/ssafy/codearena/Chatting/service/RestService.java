package com.ssafy.codearena.Chatting.service;

import com.ssafy.codearena.Chatting.dto.EffiSubmitListDto;
import com.ssafy.codearena.Chatting.dto.GameResultDto;
import com.ssafy.codearena.Chatting.dto.RestResultDto;
import com.ssafy.codearena.Chatting.dto.SubmitDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

public interface RestService {
    RestResultDto insertSubmit(SubmitDto submitDto);
    RestResultDto getRanking();
    RestResultDto getMyRecord(HttpServletRequest request);
    RestResultDto getCompetitiveResult(String gameId);
    GameResultDto getEffiSubmitList(Map<String, String> map);
}

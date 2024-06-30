package com.ssafy.codearena.chatting.service;

import com.ssafy.codearena.chatting.dto.GameResultDto;
import com.ssafy.codearena.chatting.dto.RestResultDto;
import com.ssafy.codearena.chatting.dto.SubmitDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

public interface RestService {
    RestResultDto insertSubmit(SubmitDto submitDto);
    RestResultDto getRanking();
    RestResultDto getMyRecord(HttpServletRequest request);
    RestResultDto getCompetitiveResult(String gameId);
    GameResultDto getEffiSubmitList(Map<String, String> map);
}

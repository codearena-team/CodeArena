package com.ssafy.codearena.Chatting.service;

import com.ssafy.codearena.Chatting.dto.RestResultDto;
import com.ssafy.codearena.Chatting.dto.SubmitDto;
import jakarta.servlet.http.HttpServletRequest;

public interface RestService {
    RestResultDto insertSubmit(SubmitDto submitDto);
    RestResultDto getRanking();
    RestResultDto getMyRecord(HttpServletRequest request);
}

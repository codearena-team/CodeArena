package com.ssafy.codearena.Chatting.service;

import com.ssafy.codearena.Chatting.dto.RestResultDto;
import com.ssafy.codearena.Chatting.dto.SubmitDto;

public interface RestService {
    RestResultDto insertSubmit(SubmitDto submitDto);
}

package com.ssafy.codearena.chatting.service;

import com.ssafy.codearena.chatting.dto.RestResultDto;

import java.util.Map;

public interface BattingService {
    public RestResultDto batPlayer(Map<String, String> map);
    public RestResultDto getBatStatus(Map<String, String> map);
}

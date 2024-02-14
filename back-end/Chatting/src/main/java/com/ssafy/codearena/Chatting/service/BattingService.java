package com.ssafy.codearena.Chatting.service;

import com.ssafy.codearena.Chatting.dto.BatStatusDto;
import com.ssafy.codearena.Chatting.dto.RestResultDto;

import java.util.Map;

public interface BattingService {
    public RestResultDto batPlayer(Map<String, String> map);
    public RestResultDto getBatStatus(Map<String, String> map);
    public RestResultDto commitBatResult(String gameId, String winner);
}

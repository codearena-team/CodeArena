package com.ssafy.codearena.Chatting.service;


import com.ssafy.codearena.Chatting.dto.GamePlayerDto;
import com.ssafy.codearena.Chatting.dto.CompetitiveResultDto;
import com.ssafy.codearena.Chatting.dto.CompetitiveUserInfoDto;
import com.ssafy.codearena.Chatting.dto.RestResultDto;
import com.ssafy.codearena.Chatting.dto.SubmitDto;
import com.ssafy.codearena.Chatting.dto.Top5RatingResultDto;
import com.ssafy.codearena.Chatting.dto.*;
import com.ssafy.codearena.Chatting.mapper.RestMapper;
import com.ssafy.codearena.Chatting.util.JWTUtil;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import javax.security.sasl.AuthenticationException;
import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeoutException;

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

    @Value("${rest.url}")
    private String restUrl;

    @Autowired
    private JWTUtil jwtUtil;

    private WebClient getSumbitClient(String lang){
        switch(lang){
            case "java":
                return WebClient.create(judgejava);
            case "cpp":
                return WebClient.create(judgecpp);
            default:
                return WebClient.create(judgepython);
        }
    }

    private WebClient getRestClient(String url){
        return WebClient.create(url);
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
            WebClient client = getSumbitClient(submitDto.getSubmitLang());
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

    @Override
    public RestResultDto getMyRecord(HttpServletRequest request) {
        RestResultDto restResultDto = new RestResultDto();
        restResultDto.setStatus("200");
        restResultDto.setMsg("조회에 성공하였습니다.");
        GamePlayerDto playerData = new GamePlayerDto();
        try{
            String token = request.getHeader("Authorization");

            if(token == null || "".equals(token)) throw new NullPointerException("토큰이 비었음");
            WebClient client = getRestClient(restUrl);
            HashMap<String, String> authResult = client.get().uri("/auth").header("Authorization", token).retrieve().bodyToMono(HashMap.class).block(Duration.ofMillis(10000));
            if(authResult == null) throw new TimeoutException("회원 인증 connection timeout");
            String status = authResult.get("status");
            if("302".equals(status)) throw new AuthenticationException("회원 인증 오류");
            log.debug(token);
            String userId = jwtUtil.getUserId(token);
            playerData = mapper.getUserRecordByUserId(userId);
            log.debug("result : {}",playerData.getRecord());
            if(playerData.getUserId() == null) throw new DataIntegrityViolationException("존재하지 않는 PK");
        }catch(TimeoutException e){
          log.debug("exception : {}", e);
          restResultDto.setMsg("인증 서버로부터 응답이 없습니다.");
          restResultDto.setStatus("400");
          playerData = null;
        } catch(NullPointerException e){
          log.debug("exception : {}", e);
          restResultDto.setMsg("토큰 데이터가 없습니다.");
          restResultDto.setStatus("403");
          playerData = null;
        } catch(AuthenticationException e){
            log.debug("exception : {}", e);
            restResultDto.setMsg("회원 인증오류, 토큰 갱신이 필요합니다.");
            restResultDto.setStatus("302");
            playerData = null;
        } catch(DataIntegrityViolationException e){
            log.debug("exception : {}", e);
            restResultDto.setMsg("존재하지 않는 회원입니다.");
            restResultDto.setStatus("404");
            playerData = null;
        } catch(Exception e){
            log.debug("exception : {} ", e);
            restResultDto.setMsg("알수없는 에러가 발생했습니다.");
            restResultDto.setStatus("500");
            playerData = null;
        } finally{
            restResultDto.setData(playerData);
            return restResultDto;
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
            competitiveResultDto.setPlayer1Ssumnail(competitiveUserInfoDto.getUserSsumnail());
            //player2, DTO 재활용
            competitiveUserInfoDto = mapper.getPlayerInfo(competitiveResultDto.getPlayer2Id(), competitiveResultDto.getGameMode());
            competitiveResultDto.setPlayer2Nickname(competitiveUserInfoDto.getUserNickname());
            competitiveResultDto.setPlayer2Rating(competitiveUserInfoDto.getUserRating());
            competitiveResultDto.setPlayer2Ssumnail(competitiveUserInfoDto.getUserSsumnail());

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

    @Override
    public GameResultDto getEffiSubmitList(Map<String, String> map) {

        GameResultDto resultDto = new GameResultDto();

        Map<String, Object> param = new HashMap<String, Object>();    //쿼리 매개변수

        param.put("word", map.get("word") == null ? "" : map.get("word"));  //검색조건 있다면 put

        int currentPage = Integer.parseInt(map.get("pgno") == null ? "1" : map.get("pgno"));    //특정 페이지 번호 요청이 없다면 1번
        int sizePerPage = Integer.parseInt(map.get("spp") == null ? "15" : map.get("spp"));

        int start = currentPage * sizePerPage - sizePerPage;    //쿼리로 불러올 인덱스 번호 지정

        param.put("start", start);
        param.put("listSize", sizePerPage);


        String key = map.get("key");
        param.put("key", key == null ? "" : key);


        try {
            List<CompetitiveGameSubmitDto> list = mapper.getEffiSubmitList(param);
            int totalSubmitCount = mapper.getTotalSubmitCount(param);
            int totalPageCount = (totalSubmitCount - 1) / sizePerPage + 1;

            EffiSubmitListDto effiSubmitListDto = new EffiSubmitListDto();
            effiSubmitListDto.setCurrentPage(currentPage);
            effiSubmitListDto.setTotalPageCount(totalPageCount);

            resultDto.setStatus("200");
            resultDto.setMsg("채점현황 불러오기 성공");
            resultDto.setData(effiSubmitListDto);

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

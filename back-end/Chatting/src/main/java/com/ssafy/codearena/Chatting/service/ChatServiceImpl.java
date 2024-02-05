package com.ssafy.codearena.Chatting.service;
import com.ssafy.codearena.Chatting.dto.GameCreateDto;
import com.ssafy.codearena.Chatting.dto.GameInfoDto;
import com.ssafy.codearena.Chatting.dto.GameListDto;
import com.ssafy.codearena.Chatting.dto.GameResultDto;
import com.ssafy.codearena.Chatting.mapper.GameMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.*;
@RequiredArgsConstructor
@Slf4j
@Service
public class ChatServiceImpl implements ChatService{
    private Map<String, Integer> gameParticipants;  //Redis로 관리
    private final GameMapper gameMapper;
    @PostConstruct
    private void init() {
        gameParticipants = new LinkedHashMap<>();
    }
    /*
     * 모든 방 리스트 찾기
     * */
    @Override
    public GameResultDto findAllRoom(Map<String, String> map) {
        //결과값 세팅
        GameResultDto gameResultDto = new GameResultDto();
        gameResultDto.setStatus("200");
        gameResultDto.setMsg("게임 방 목록 조회 성공");
        Map<String, Object> param = new HashMap<String, Object>();    //쿼리 매개변수
        param.put("word", map.get("word") == null ? "" : map.get("word"));  //검색 필터 값
        param.put("gameMode", map.get("gameMode") == null ? "" : map.get("gameMode"));  //게임 모드 필터
        int currentPage = Integer.parseInt(map.get("pgno") == null ? "1" : map.get("pgno"));    //특정 페이지 번호 요청이 없다면 1번
        int sizePerPage = Integer.parseInt(map.get("spp") == null ? "15" : map.get("spp"));
        int start = currentPage * sizePerPage - sizePerPage;    //쿼리로 불러올 인덱스 번호 지정
        param.put("start", start);
        param.put("listSize", sizePerPage);
        String key = map.get("key");    //검색조건 : 문제번호 or 유저 닉네임
        param.put("key", key == null ? "" : key);
        param.put("sortType", map.get("sortType") == null ? "" : map.get("sortType"));  //정렬 조건
        try {
            List<GameInfoDto> list = gameMapper.findAllRoom(param);
            int totalGameCount = gameMapper.getTotalGameCount(param);
            int totalPageCount = (totalGameCount - 1) / sizePerPage + 1;
            /*
             * 참여자 수 세팅
             * */
            for(GameInfoDto gameInfo : list) {
                String curId = gameInfo.getGameId();
                if(gameParticipants.get(curId) == null) {
                    gameInfo.setParticipants(0);
                }
                else {
                    gameInfo.setParticipants(gameParticipants.get(gameInfo.getGameId()));
                }
            }
            GameListDto gameListDto = new GameListDto();
            gameListDto.setGameRooms(list);
            gameListDto.setCurrentPage(totalGameCount);
            gameListDto.setTotalPageCount(totalPageCount);
            gameResultDto.setData(gameListDto);
        }
        catch (Exception e) {
            gameResultDto.setStatus("500");
            gameResultDto.setMsg("Server Internal Error");
            gameResultDto.setData(null);
        }
        return gameResultDto;
    }
    /*
     * 특정 방 찾기
     * */
    @Override
    public GameResultDto findRoomById(String gameId) {
        GameResultDto gameResultDto = new GameResultDto();
        gameResultDto.setStatus("200");
        gameResultDto.setMsg("게임방 조회 성공");
        try {
//            log.info(gameId);
            GameInfoDto gameInfoDto = gameMapper.findRoomById(gameId);
            //참여자 수 조회
            gameInfoDto.setParticipants(gameParticipants.get(gameInfoDto.getGameId()));
            gameResultDto.setData(gameInfoDto);
        }
        catch (Exception e) {
            gameResultDto.setStatus("500");
            gameResultDto.setMsg("Server Internal Error");
            gameResultDto.setData(null);
        }
        return gameResultDto;
    }
    @Override
    public GameResultDto createPrivateRoom(GameCreateDto gameCreateDto) {
        GameResultDto gameResultDto = new GameResultDto();
        gameResultDto.setStatus("200");
        gameResultDto.setMsg("성공적으로 1:1 게임방이 생성되었습니다.");
        gameResultDto.setData(null);
        try {
            //게임 제목 지정 (닉네임으로 어떻게 지정할건지 보류)
            String title = gameCreateDto.getUserRed() + " vs " + gameCreateDto.getUserBlue();
            gameCreateDto.setTitle(title);
            //랜덤 문제 배정
            int randomProblem = gameMapper.findProblemById();
            gameCreateDto.setProblemId(Integer.toString(randomProblem));
            gameMapper.createPrivateRoom(gameCreateDto);
            gameResultDto.setData(randomProblem);   //배정된 문제번호 세팅
            gameParticipants.put(gameCreateDto.getGameId(), 0); //참여자 수 관리 리소스 생성
        }
        catch (Exception e) {
            gameResultDto.setStatus("500");
            gameResultDto.setMsg("Server Internal Error");
        }
        return gameResultDto;
    }
    @Override
    public void plusParticipants(String gameId) {
        Integer participant = gameParticipants.get(gameId);
        participant++;
        gameParticipants.put(gameId, participant);
    }
    @Override
    public void minusParticipants(String gameId) {
        Integer participant = gameParticipants.get(gameId);
        participant--;
        gameParticipants.put(gameId, participant);
    }
//    @Override
//    public BoardListDto listArticle(Map<String, String> map) throws Exception {
//        Map<String, Object> param = new HashMap<String, Object>();
//        param.put("word", map.get("word") == null ? "" : map.get("word"));
//        int currentPage = Integer.parseInt(map.get("pgno") == null ? "1" : map.get("pgno"));
//        int sizePerPage = Integer.parseInt(map.get("spp") == null ? "20" : map.get("spp"));
//        System.out.println("??");
//        int boardtype = Integer.parseInt(map.get("boardtype") == null ? "1" : map.get("boardtype"));
//        System.out.println("??");
//        int start = currentPage * sizePerPage - sizePerPage;
//        param.put("start", start);
//        param.put("listsize", sizePerPage);
//        param.put("boardtype", boardtype);
//
//        String key = map.get("key");
//        param.put("key", key == null ? "" : key);
//        if ("user_id".equals(key))
//            param.put("key", key == null ? "" : "b.user_id");
//        List<BoardDto> list = boardMapper.listArticle(param);
//        if ("user_id".equals(key))
//            param.put("key", key == null ? "" : "user_id");
//        int totalArticleCount = boardMapper.getTotalArticleCount(param);
//        int totalPageCount = (totalArticleCount - 1) / sizePerPage + 1;
//
//        BoardListDto boardListDto = new BoardListDto();
//        boardListDto.setArticles(list);
//        boardListDto.setCurrentPage(currentPage);
//        boardListDto.setTotalPageCount(totalPageCount);
//
//        return boardListDto;
//    }
}
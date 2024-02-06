package com.ssafy.codearena.Chatting.service;
import com.ssafy.codearena.Chatting.controller.OpenviduController;
import com.ssafy.codearena.Chatting.dto.*;
import com.ssafy.codearena.Chatting.mapper.GameMapper;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.*;
@RequiredArgsConstructor
@Slf4j
@Service
public class ChatServiceImpl implements ChatService{
    private Map<String, CompetitiveManageDto> gameManage;  //Redis로 관리
    private final GameMapper gameMapper;
    private final OpenviduController openviduController;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;
    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;
    private OpenVidu openvidu;

    @PostConstruct
    private void init() {
        gameManage = new LinkedHashMap<>();
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
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
                if(gameManage.get(curId) == null) {
                    gameInfo.setParticipants(0);
                }
                else {
                    gameInfo.setParticipants(gameManage.get(gameInfo.getGameId()).getParticipants());
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
            gameInfoDto.setParticipants(gameManage.get(gameInfoDto.getGameId()).getParticipants());
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
    public GameResultDto createCompetitiveRoom(GameCreateDto gameCreateDto) {
        GameResultDto gameResultDto = new GameResultDto();
        gameResultDto.setStatus("200");
        gameResultDto.setMsg("성공적으로 1:1 게임방이 생성되었습니다.");
        gameResultDto.setData(null);
        try {

            //랜덤 문제 배정
            CreateCompetitiveResultDto createCompetitiveResultDto = new CreateCompetitiveResultDto();
            int randomProblem = gameMapper.findProblemById();
            createCompetitiveResultDto.setProblemId(Integer.toString(randomProblem));   //응답객체 값 저장
            createCompetitiveResultDto.setGameId(gameCreateDto.getGameId());     //응답객체 값 저장

            gameCreateDto.setProblemId(Integer.toString(randomProblem));

            gameMapper.createPrivateRoom(gameCreateDto);    //DB I/O

            //게임 매니저 객체 생성 및 내부 리소스 추가
            CompetitiveManageDto competitiveManageDto = new CompetitiveManageDto();
            competitiveManageDto.setParticipants(0);
            competitiveManageDto.setPlayer1(gameCreateDto.getUserRed());
            competitiveManageDto.setPlayer1(gameCreateDto.getUserBlue());
            competitiveManageDto.setPlayer1_leave(false);
            competitiveManageDto.setPlayer2_leave(false);
            gameManage.put(gameCreateDto.getGameId(), competitiveManageDto);

            Map<String, String> map = new HashMap<>();
            map.put("CustomId", String.valueOf(gameCreateDto.getGameId()));
            SessionProperties properties = SessionProperties.fromJson(map).build();
            Session session = openvidu.createSession(properties);
            createCompetitiveResultDto.setViduSession(session.getSessionId());  //Session Id 저장
            
            gameResultDto.setData(createCompetitiveResultDto);   //배정된 게임방ID, vidu 세션 ID, 랜덤 문제번호

        }
        catch (Exception e) {
            gameResultDto.setStatus("500");
            gameResultDto.setMsg("Server Internal Error");
        }
        return gameResultDto;
    }
    @Override
    public void plusParticipants(String gameId) {
        CompetitiveManageDto competitiveManageDto = gameManage.get(gameId);
        competitiveManageDto.setParticipants(competitiveManageDto.getParticipants() + 1);
    }
    @Override
    public void minusParticipants(String gameId) {
        CompetitiveManageDto competitiveManageDto = gameManage.get(gameId);
        competitiveManageDto.setParticipants(competitiveManageDto.getParticipants() - 1);
    }

    @Override
    public boolean playerLeaveEvent(String gameId, String playerId) {

        CompetitiveManageDto competitiveManageDto = gameManage.get(gameId);
        if(competitiveManageDto.getPlayer1().equals(playerId)) {
            competitiveManageDto.setPlayer1_leave(true);
        }
        else {
            competitiveManageDto.setPlayer2_leave(true);
        }

        if(competitiveManageDto.isPlayer1_leave() && competitiveManageDto.isPlayer2_leave()) {
            terminateGame(gameId, "");
            return true;
        }
        return false;
    }

    @Override
    public void terminateGame(String gameId, String winner) {

        gameManage.remove(gameId);

        try {

            gameMapper.terminateGame(gameId, winner);
        }
        catch (Exception ignored) {

        }
    }

    @Override
    public void findWinner(String gameId) {
        CompetitiveManageDto competitiveManageDto = gameManage.get(gameId);
        String player1 = competitiveManageDto.getPlayer1();
        String player2 = competitiveManageDto.getPlayer2();

        //첫번째 유저의 채점현황에서 '맞았습니다.' 결과가 있는지
        try {

            gameMapper.passProblem(gameId, player1);
        }
        catch (Exception e) {

        }

        //두번째 유저의 채점현황에서 '맞았습니다.' 결과가 있는지
        try {

            gameMapper.passProblem(gameId, player2);
        }
        catch (Exception e) {

        }

    }

}
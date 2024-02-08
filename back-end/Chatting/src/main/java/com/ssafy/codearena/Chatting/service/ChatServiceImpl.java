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
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class ChatServiceImpl implements ChatService{
    private Map<String, CompetitiveManageDto> gameManage;  //Redis로 관리
    private final GameMapper gameMapper;
    private final OpenviduController openviduController;
    private final int weight = 30;

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
        param.put("roomType", map.get("roomType") == null ? "0" : map.get("roomType"));  //방 타입 필터
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
            gameCreateDto.setRoomType("0");

            gameMapper.createPrivateRoom(gameCreateDto);    //DB I/O

            //게임 매니저 객체 생성 및 내부 리소스 추가
            CompetitiveManageDto competitiveManageDto = new CompetitiveManageDto();
            competitiveManageDto.setGameId(gameCreateDto.getGameId());
            competitiveManageDto.setParticipants(0);
            competitiveManageDto.setPlayer1(gameCreateDto.getUserRed());
            competitiveManageDto.setPlayer2(gameCreateDto.getUserBlue());
            competitiveManageDto.setPlayer1_leave(false);
            competitiveManageDto.setPlayer2_leave(false);
            competitiveManageDto.setGamemode(gameCreateDto.getGameMode());
            competitiveManageDto.setRoomType("0");
            log.info(String.valueOf(competitiveManageDto));
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
            log.error("Exception Msg", e);
        }
        return gameResultDto;
    }
    @Override
    public void plusParticipants(String gameId) {
        CompetitiveManageDto competitiveManageDto = gameManage.get(gameId);
        competitiveManageDto.setParticipants(competitiveManageDto.getParticipants() + 1);
        log.info("참여 이벤트 발생 : " + String.valueOf(gameManage.get(gameId).getParticipants()));
    }
    @Override
    public void minusParticipants(String gameId) {
        CompetitiveManageDto competitiveManageDto = gameManage.get(gameId);
        competitiveManageDto.setParticipants(competitiveManageDto.getParticipants() - 1);
        log.info("퇴장 이벤트 발생 : " + String.valueOf(gameManage.get(gameId).getParticipants()));
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
            return true;
        }
        return false;
    }

    @Override
    public String terminateGame(String gameId, String winner) {

        CompetitiveManageDto competitiveManageDto = gameManage.get(gameId);
        log.info(String.valueOf(competitiveManageDto));
        String player1 = competitiveManageDto.getPlayer1();
        String player2 = competitiveManageDto.getPlayer2();

        int player1_rating = 0;
        int player2_rating = 0;

        Map<String, String> param = new HashMap<>();
        param.put("player", player1);
        param.put("gamemode", competitiveManageDto.getGamemode());

        // 두 유저의 레이팅 점수 탐색
        try {

            player1_rating = gameMapper.isRating(param);
            param.put("player", player2);
            player2_rating = gameMapper.isRating(param);
        }
        catch (Exception e) {

            log.error("Exception Msg", e);
        }

        log.info(String.valueOf(player1_rating));
        log.info(String.valueOf(player2_rating));

        //최종 레이팅 계산
        int player1_result = 0;
        int player2_result = 0;
        //player1이 이겼을 경우
        if(winner.equals(player1)) {
            player1_result = CaluRating(player1_rating, player2_rating, "승리");
            player2_result = CaluRating(player2_rating, player1_rating, "패배");
        }
        //player2가 이겼을 경우
        else if(winner.equals(player2)) {
            player1_result = CaluRating(player1_rating, player2_rating, "패배");
            player2_result = CaluRating(player2_rating, player1_rating, "승리");
        }
        //무승부
        else if(winner.equals("")) {
            player1_result = CaluRating(player1_rating, player2_rating, "무승부");
            player2_result = CaluRating(player2_rating, player1_rating, "무승부");
        }



        try {   //종료시간 및 승자 DB I/O

            gameMapper.terminateGame(gameId, winner);
        }
        catch (Exception e) {

            log.error("Exception Msg", e);
        }

        try {   //레이팅 갱신

            gameMapper.refreshRating(player1, Integer.toString(player1_result), competitiveManageDto.getGamemode());
            gameMapper.refreshRating(player2, Integer.toString(player2_result), competitiveManageDto.getGamemode());
        }
        catch (Exception e) {
            log.error("Exception Msg", e);
        }

        //객체 제거
        gameManage.remove(gameId);

        return "플레이어 1 : " + player1_result + " AND " + "플레이어 2 : " + player2_result;

    }

    //ELO 레이팅 계산 로직
    private int CaluRating(int myRating, int diffRating, String result) {
        float powValue = (float) (diffRating - myRating) / 400;
        float winRatio = (float) (1 / (Math.pow(10, powValue) + 1));

        int rating = 0;
        if(result.equals("승리")) {
            rating = (int) (myRating + weight * (1 - winRatio));
        }
        else if(result.equals("패배")) {
            rating = (int) (myRating + weight * (0 - winRatio));
        }
        else if(result.equals("무승부")) {
            rating = (int) (myRating + weight * (0.5 - winRatio));
        }


        return rating;
    }

    @Override
    public WinnerInfoDto findWinner(String gameId) {
        CompetitiveManageDto competitiveManageDto = gameManage.get(gameId);
        String player1 = competitiveManageDto.getPlayer1();
        String player2 = competitiveManageDto.getPlayer2();
        int result = 0;
        //player1, player2의 '맞았습니다' 결과 개수 탐색
        try {

            result = gameMapper.passProblem(gameId, player1, player2);
        }
        catch (Exception e) {

            log.error("Exception Msg", e);
        }

        WinnerInfoDto winnerInfoDto = new WinnerInfoDto();
        if(result > 0) {
            //승자 탐색
            try {
                winnerInfoDto = gameMapper.winnerSearch(gameId);
            }
            catch (Exception e) {

                log.error("Exception Msg", e);
            }
        }
        else {
            winnerInfoDto = null;
        }
        //두 유저 모두 '맞았습니다.' 결과가 존재할 경우 승자 탐색


        return winnerInfoDto;
    }

    @Override
    public List<CompetitiveTopMatchResultDto> getTopFiveMatch() {

        //Map 데이터 정렬
        List<CompetitiveManageDto> list = new ArrayList<>(gameManage.values());
        Collections.sort(list);

        List<CompetitiveTopMatchResultDto> topMatch = new ArrayList<>();

        //Top 5
        if(gameManage.size() >= 5) {
            for (int i = 0; i < 5; i++) {
                CompetitiveManageDto competitiveManageDto = list.get(i);
                log.info(String.valueOf(competitiveManageDto));
                try {
                    CompetitiveTopMatchResultDto competitiveTopMatchResultDto = new CompetitiveTopMatchResultDto();

                    //두 유저의 정보 조회
                    CompetitiveUserInfoDto player1Info = gameMapper.getUserInfo(competitiveManageDto.getPlayer1(), competitiveManageDto.getGamemode());
                    CompetitiveUserInfoDto player2Info = gameMapper.getUserInfo(competitiveManageDto.getPlayer2(), competitiveManageDto.getGamemode());

                    competitiveTopMatchResultDto.setPlayer1Nickname(player1Info.getUserNickname());
                    competitiveTopMatchResultDto.setPlayer1Rating(player1Info.getUserRating());
                    competitiveTopMatchResultDto.setPlayer2Nickname(player2Info.getUserNickname());
                    competitiveTopMatchResultDto.setPlayer2Rating(player2Info.getUserRating());
                    competitiveTopMatchResultDto.setGameId(competitiveManageDto.getGameId());
                    competitiveTopMatchResultDto.setParticipants(competitiveManageDto.getParticipants());

                    topMatch.add(competitiveTopMatchResultDto);
                } catch (Exception e) {

                    log.error("Exception Msg", e);
                    break;
                }
            }
        }
        //진행중인 게임이 5미만이라면 방 개수만큼 탐색
        else {

            for (int i = 0; i < list.size(); i++) {
                CompetitiveManageDto competitiveManageDto = list.get(i);
                log.info(String.valueOf(competitiveManageDto));

                try {
                    CompetitiveTopMatchResultDto competitiveTopMatchResultDto = new CompetitiveTopMatchResultDto();

                    CompetitiveUserInfoDto player1Info = gameMapper.getUserInfo(competitiveManageDto.getPlayer1(), competitiveManageDto.getGamemode());
                    CompetitiveUserInfoDto player2Info = gameMapper.getUserInfo(competitiveManageDto.getPlayer2(), competitiveManageDto.getGamemode());

                    competitiveTopMatchResultDto.setPlayer1Nickname(player1Info.getUserNickname());
                    competitiveTopMatchResultDto.setPlayer1Rating(player1Info.getUserRating());
                    competitiveTopMatchResultDto.setPlayer2Nickname(player2Info.getUserNickname());
                    competitiveTopMatchResultDto.setPlayer2Rating(player2Info.getUserRating());
                    competitiveTopMatchResultDto.setGameId(competitiveManageDto.getGameId());
                    competitiveTopMatchResultDto.setParticipants(competitiveManageDto.getParticipants());

                    topMatch.add(competitiveTopMatchResultDto);
                } catch (Exception e) {

                    log.error("Exception Msg", e);
                    break;
                }
            }
        }

        return topMatch;
    }

}
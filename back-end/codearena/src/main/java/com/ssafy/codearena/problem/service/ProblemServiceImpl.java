package com.ssafy.codearena.problem.service;


import com.ssafy.codearena.alarm.dto.AlarmSendDto;
import com.ssafy.codearena.alarm.mapper.AlarmMapper;
import com.ssafy.codearena.alarm.service.AlarmService;
import com.ssafy.codearena.problem.dto.*;
import com.ssafy.codearena.problem.mapper.ProblemMapper;
import com.ssafy.codearena.user.dto.UserProblemCateDto;
import com.ssafy.codearena.util.JwtUtil;
import jakarta.mail.AuthenticationFailedException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.transaction.Transaction;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.reactive.function.client.WebClient;

import javax.xml.transform.Result;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProblemServiceImpl implements ProblemService{

    private final ProblemMapper mapper;

    private final AlarmService alarmService;
    private final JwtUtil jwtUtil;
    private static final int ADMIN_ID = 1;

    private static final int ALARM_TYPE = 1;
    private static final int BASIC_SPP = 15;
    private static final int BASIC_PGNO = 1;

    @Value("${judge.java.url}")
    private String judgeJava;

    @Value("judge.cpp.url")
    private String judgecpp;

    @Value("judge.python.url")
    private String judgepython;


    @Override
    public ResultDto getProblemList(HashMap<String, String> map) {
        ResultDto resultDto = new ResultDto();
        HashMap<String, String> hashMap = new HashMap<>();
        ProblemListDto problemListDto = new ProblemListDto();
        try{
            int spp = BASIC_SPP;
            String sppParam = "";
            int pgno = BASIC_PGNO;
            String pgnoParam = "";
            if(map.containsKey("spp")) {
                sppParam = map.get("spp");
            }
            if(sppParam!=null && !"".equals(sppParam)){
                spp = Integer.parseInt(sppParam);
            }
            if(map.containsKey("pgno")){
                pgnoParam = map.get("pgno");
            }
            if(pgnoParam!=null && !"".equals(pgnoParam)){
                pgno = Integer.parseInt(pgnoParam);
            }
            String cate = "";
            if(map.containsKey("cate")){
                cate = map.get("cate");
            }
            switch(cate) {
                case "problemTitle":
                    cate = "problem_title";
                    break;
                case "problemId":
                    cate = "problem_id";
                    break;
                case "userNickname":
                    cate = "user_nickname";
                    break;
            }
            hashMap.put("cate", cate);
            String word = "";
            if(map.containsKey("word")){
                word = map.get("word");
            }
            hashMap.put("word", word);
            String tag = "";
            if(map.containsKey("tag")){
                tag = map.get("tag");
            }
            hashMap.put("tag", tag);
            int totalItemCount = mapper.problemCount(hashMap);
            int totalPageCount = 1;
            if(totalItemCount > spp) totalPageCount = (totalItemCount%spp) == 0 ? totalItemCount/spp : totalItemCount/spp+1;


            if(pgno > totalPageCount) pgno = totalPageCount;
            String orderBy = "";
            if(map.containsKey("orderBy")){
                orderBy = map.get("orderBy");
            }
            switch(orderBy){
                case "date":
                    orderBy = "problem_date";
                    break;
                case "submit":
                    orderBy = "submit_count";
                    break;
                case "accept":
                    orderBy = "accept_count";
                    break;
                default:
                    orderBy = "percentage";
                    break;
            }
            hashMap.put("orderBy", orderBy);
            hashMap.put("start", String.valueOf((pgno-1) * spp));
            hashMap.put("offset", String.valueOf(spp));
            List<ProblemWithSearchDto> list = mapper.selectProblemList(hashMap);
            problemListDto.setProblemWithSearch(list);
            problemListDto.setItemCount(totalItemCount);
            problemListDto.setPageCount(totalPageCount);
            resultDto.setStatus("200");
            resultDto.setMsg("검색 결과가 "+problemListDto.getItemCount()+"건 존재합니다.");
            if(problemListDto.getItemCount() == 0){
                resultDto.setStatus("202");
            }
            resultDto.setData(problemListDto);
        }catch(Exception e){
            resultDto.setStatus("500");
            resultDto.setMsg("검색중 문제가 발생하였습니다.");
            e.printStackTrace();
        }finally{
            return resultDto;
        }
    }

    @Override
    public ResultDto insertProblem(ProblemForInsertDto problemForInsertDto) {
        ResultDto resultDto = new ResultDto();
        try{
            mapper.insertProblem(problemForInsertDto);
            TCListDto tcListDto = new TCListDto();
            tcListDto.setProblemId(problemForInsertDto.getProblemId());
            tcListDto.setTestCase(problemForInsertDto.getTestCase());
            log.debug("testcase : {}",tcListDto);
            mapper.insertTestCase(tcListDto);
            TagListDto tagListDto = new TagListDto();
            tagListDto.setProblemId(problemForInsertDto.getProblemId());
            tagListDto.setTagList(problemForInsertDto.getTagList());
            mapper.insertProblemTagList(tagListDto);

            resultDto.setStatus("201");
            resultDto.setMsg("문제 임시 생성 및 요청이 성공적으로 보내졌습니다.");
            AlarmSendDto alarmSendDto = new AlarmSendDto();

            alarmSendDto.setAlarmMsg("문제 확인 부탁드립니다. 문제번호 : "+ problemForInsertDto.getProblemId());
            alarmSendDto.setAlarmType(ALARM_TYPE);
            alarmSendDto.setAlarmStatus("요청 대기");
            alarmSendDto.setFromId(Integer.parseInt(problemForInsertDto.getUserId()));
            alarmSendDto.setToId(ADMIN_ID);
            alarmService.send(alarmSendDto);
        }catch(Exception e){
            log.error("exception : {}", e);
            resultDto.setStatus("500");
            resultDto.setMsg("문제 생성 로직 중 문제가 발생하였습니다.");
        }finally{
            return resultDto;
        }

    }

    @Override
    public ResultDto deleteProblem(String problemId) {
        ResultDto resultDto = new ResultDto();
        resultDto.setMsg("해당 문제가 성공적으로 삭제되었습니다.");
        resultDto.setStatus("200");
        try{
            mapper.deleteProblem(problemId);
        }catch(Exception e){
            log.error("exceptino : {}", e);
            resultDto.setStatus("500");
            resultDto.setMsg("삭제 도중 에러가 발생하였습니다.");
        }finally{
            return resultDto;
        }
    }

    @Override
    public ResultDto getTagCategory() {
        ResultDto resultDto = new ResultDto();
        try{
            List<TagDto> tagList = mapper.getAllTagNames();
            resultDto.setStatus("200");
            resultDto.setMsg("태그 목록을 불러오는데 성공하였습니다.");
            resultDto.setData(tagList);
        }catch(Exception e){
            log.error("exception : {}", e);
            resultDto.setData(null);
            resultDto.setStatus("500");
            resultDto.setMsg("태그 목록을 불러오는 도중 에러가 발생하였습니다.");
        }finally{
            return resultDto;
        }
    }

    @Override
    public ResultDto getProblemDetail(String problemId, HttpServletRequest request) {
        ResultDto resultDto = new ResultDto();
        ProblemDetailDto problemDetail = new ProblemDetailDto();
        resultDto.setMsg("문제 번호 "+problemId+"에 대한 정보를 조회하는데 성공했습니다.");
        resultDto.setData(problemDetail);
        resultDto.setStatus("200");
        try{
            HashMap<String, String> params = new HashMap<>();
            params.put("problemId", problemId);
            String token = request.getHeader("Authorization");
            log.debug("token : {}",token);
            problemDetail = mapper.getProblemDetailByProblemId(problemId);
            //log.debug("{}",jwtUtil.isAdmin(token));
            String userId = "";
            problemDetail.setIsSolve(true);
            if("0".equals(problemDetail.getProblemVisibility()) && (token==null || "".equals(token) || !jwtUtil.isAdmin(token))) throw new AuthenticationFailedException("권한 없음");
            if("1".equals(problemDetail.getProblemVisibility()) && (token==null || "".equals(token))) problemDetail.setIsSolve(false);
            else userId = jwtUtil.getUserId(token);
            if(userId !=null && !"".equals(userId)){
                params.put("userId", userId);
                int isAccept = mapper.isAccept(params);
                problemDetail.setIsSolve((isAccept >= 1));
            }
        }catch(AuthenticationFailedException e){
            log.debug("exception : {}", e);
            resultDto.setStatus("403");
            resultDto.setMsg("접근 권한이 없습니다.");
            problemDetail =null;
        }catch(Exception e){
            log.debug("exception : {}", e);
            resultDto.setStatus("500");
            resultDto.setMsg("문제 번호 "+problemId+"에 대한 정보를 조회하는데 에러가 발생하였습니다.");
            problemDetail = null;
        }finally{
            resultDto.setData(problemDetail);
            return resultDto;
        }
    }

    @Override
    public ResultDto getTestCase(String problemId) {
        ResultDto resultDto = new ResultDto();
        List<TestCaseDto> testcase = Collections.EMPTY_LIST;
        resultDto.setStatus("202");
        resultDto.setMsg("문제번호 : "+problemId+"에 대한 테스트케이스가 비었습니다.");
        try{
            testcase = mapper.getTestCasesByProblemId(problemId);
            if(!testcase.isEmpty()){
                resultDto.setStatus("200");
                resultDto.setMsg("문제번호 : "+problemId+"에 대한 테스트케이스 조회에 성공했습니다.");
            }
        }catch(Exception e){
            testcase = Collections.EMPTY_LIST;
            resultDto.setMsg("문제번호 : "+problemId+" 에 대한 테스트케이스 조회 중 에러가 발생하였습니다.");
        }finally{
            resultDto.setData(testcase);
            return resultDto;
        }
    }
    private WebClient getClient(String lang){
        switch(lang){
            case "java":
                return WebClient.create(judgeJava);

            case "cpp":
                return WebClient.create(judgecpp);

            default:
                return WebClient.create(judgepython);

        }
    }
    @Override
    public ResultDto insertSubmit(String problemId, SubmitDto submitDto) {
        ResultDto resultDto = new ResultDto();
        resultDto.setStatus("200");
        resultDto.setMsg("성공적으로 채점서버에 제출되었습니다.");
        submitDto.setSubmitStatus("채점중");
        submitDto.setProblemId(problemId);
        log.debug("params : {}", submitDto);
        try{
            mapper.insertSubmit(submitDto);
            WebClient client = getClient(submitDto.getSubmitLang());
            Integer submitNo = submitDto.getSubmitNo();
            HashMap<String, String> params = new HashMap<>();
            log.debug("url : {}", judgeJava);
            params.put("submitNo", String.valueOf(submitNo));
            params.put("userId", null);
            params.put("problemId", submitDto.getProblemId());
            params.put("code", submitDto.getCode());
            SubmitTagListDto listDto = new SubmitTagListDto();
            listDto.setSubmitNo(submitDto.getSubmitNo());
            listDto.setTagList(submitDto.getTagList());
            if(!listDto.getTagList().isEmpty()){
                mapper.insertSubmitTags(listDto);
            }
            client.post().uri("/judge/normal").contentType(MediaType.APPLICATION_JSON).bodyValue(params).retrieve().bodyToMono(HashMap.class).subscribe();

        }catch(Exception e){
            log.debug("exception {}", e);
            resultDto.setStatus("500");
            resultDto.setMsg("채점 시도 중 에러가 발생하였습니다.");
        }finally{
            return resultDto;
        }

    }

    @Override
    public ResultDto getSubmitList(HashMap<String, String> params) {
        ResultDto resultDto = new ResultDto();
        SubmitListDto list = new SubmitListDto();
        List<SubmitDto> submitList = new ArrayList<>();
        list.setItemCount(0);
        list.setPageCount(BASIC_PGNO);
        resultDto.setStatus("202");
        try{
            int spp = BASIC_SPP;
            String problemId = "";
            String userNickname = "";
            String lang = "";
            String orderBy= "";
            String pgnoParam = "";
            String sppParam = "";
            int pgno = BASIC_PGNO;
            if(params.containsKey("spp") && Integer.parseInt(params.get("spp")) > 0){
                sppParam = params.get("spp");
            }
            if(params.containsKey("problemId")){
                problemId = params.get("problemId");
            }
            if(params.containsKey("userNickname")){
                userNickname = params.get("userNickname");
            }
            if(params.containsKey("lang")){
                lang = params.get("lang");
            }
            if(params.containsKey("orderBy")){
                orderBy = params.get("orderBy");
            }
            if(params.containsKey("pgno")){
                pgnoParam = params.get("pgno");
            }
            if(pgnoParam != null && !"".equals(pgnoParam)){
                pgno = Integer.parseInt(pgnoParam);
            }
            if(sppParam != null && !"".equals(sppParam)){
                spp = Integer.parseInt(sppParam);
            }
            params = new HashMap<>();
            params.put("problemId", problemId);
            params.put("userNickname", userNickname);
            params.put("lang", lang);
            int itemCount = mapper.getSubmitCount(params);
            int pageCount = BASIC_PGNO;
            if(itemCount > spp) pageCount = (itemCount%spp) == 0 ? itemCount/spp : itemCount/spp+1;
            if(pageCount < pgno){
                pgno = BASIC_PGNO;
            }
            resultDto.setMsg("검색 결과 "+itemCount+"건 검색되었습니다.");
            if(itemCount > 0){
                params.put("start", String.valueOf((pgno-1) * spp));
                params.put("offset", String.valueOf(spp));
                switch(orderBy){
                    case "timeComplexity":
                        orderBy = "time_complexity";
                        break;
                    default :
                        orderBy = "submit_date";
                        break;
                }
                params.put("orderBy", orderBy);
                resultDto.setStatus("200");
                submitList = mapper.getSubmitList(params);
                list.setPageCount(pageCount);
                list.setItemCount(itemCount);
            }

        }catch(Exception e){
            log.debug("exception {}", e);
            submitList = Collections.EMPTY_LIST;
            resultDto.setMsg("채점 현황 조회 중 에러가 발생하였습니다.");
            resultDto.setStatus("500");
        }finally{
            list.setSubmitList(submitList);
            resultDto.setData(list);
            return resultDto;
        }
    }

    @Override
    public ResultDto getSubmitStatistics(String problemId, HashMap<String, String> params) {
        SubmitStatisticDto submitStatistic = null;
        ResultDto resultDto = new ResultDto();
        resultDto.setStatus("403");
        resultDto.setMsg("권한이 없습니다.");
        params.put("problemId", problemId);
        try{
            String userId = "";
            boolean isAccept = false;
            if(params.containsKey("userId")){
                userId = params.get("userId");
            }
            if(!"".equals(userId)){
                params.put("userId", userId);
                isAccept = mapper.isAccept(params) >= 1;
            }
            if(isAccept){
                AvgByLangDto avgByLangDto = mapper.getAvgByLang(problemId);
                List<RatioOfAlgoDto> ratioOfAlgoDto = mapper.getRatioOfAlgo(problemId);
                submitStatistic = new SubmitStatisticDto();
                submitStatistic.setAvgByLang(avgByLangDto);
                submitStatistic.setRatioOfAlgo(ratioOfAlgoDto);
                resultDto.setMsg("통계 데이터 조회에 성공했습니다.");
                resultDto.setStatus("200");
            }
        }catch(Exception e){
            log.debug("exception : {}", e);
            resultDto.setMsg("통계 데이터를 불러오는 중 에러가 발생했습니다.");
            resultDto.setStatus("500");
        }finally{
            resultDto.setData(submitStatistic);
            return resultDto;
        }
    }

    @Override
    public ResultDto getProblemDetailForUpdate(String problemId) {
        ResultDto resultDto = new ResultDto();
        resultDto.setStatus("200");
        resultDto.setMsg("문제 업데이트를 위한 정보 불러오기에 성공했습니다.");
        ProblemForInsertDto problem = new ProblemForInsertDto();
        try{
            problem = mapper.getProblemDetailForUpdateByProblemId(problemId);
        }catch(Exception e){
            log.debug("exception : ", e);
            resultDto.setStatus("500");
            resultDto.setMsg("문제가 발생했습니다.");
        }finally{
            resultDto.setData(problem);
            return resultDto;
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public ResultDto updateProblem(ProblemForInsertDto problemForInsertDto) {
        ResultDto resultDto = new ResultDto();
        resultDto.setMsg("문제정보가 정상적으로 업데이트 되었습니다.");
        resultDto.setStatus("200");
        try{
            int update = mapper.updateProblemByProblemId(problemForInsertDto);
            if(update == 0) throw new DataIntegrityViolationException("PK 오류");
            TagListDto tagListDto = new TagListDto();
            int problemId = problemForInsertDto.getProblemId();
            tagListDto.setProblemId(problemId);
            tagListDto.setTagList(problemForInsertDto.getTagList());
            mapper.deleteProblemTagsByProblemId(problemId);
            mapper.insertProblemTagList(tagListDto);
        }catch(DataIntegrityViolationException e){
            log.debug("exception : {}", e);
            resultDto.setStatus("404");
            resultDto.setMsg("해당하는 문제 정보를 찾을 수 없습니다.");
        }catch(Exception e){
            log.debug("exception : {}", e);
            resultDto.setStatus("500");
            resultDto.setMsg("문제 업데이트 도중 에러가 발생하였습니다.");
        }finally {
            return resultDto;
        }
    }

    @Override
    public ResultDto updateProblemStatus(String problemId, HashMap<String, String> params, HttpServletRequest request) {
        ResultDto resultDto = new ResultDto();
        resultDto.setMsg("업데이트에 성공했습니다.");
        resultDto.setStatus("200");
        try{
            if(problemId == null || "".equals(problemId)) throw new DataIntegrityViolationException("request problemId not found");
            params.put("problemId", problemId);
            String token = request.getHeader("Authorization");
            if("".equals(token) || token == null || !jwtUtil.isAdmin(token)) throw new AuthenticationFailedException("권한이 없습니다.");
            int update = mapper.updateProblemStatusByProblemId(params);
            if(update != 1) throw new DataIntegrityViolationException("problem Not Found Exception");
        } catch(DataIntegrityViolationException e){
            log.debug("exception : {}", e);
            resultDto.setStatus("404");
            resultDto.setMsg("problemId "+e.getMessage());
        }catch(AuthenticationFailedException e){
            log.debug("exception : {}", e);
            resultDto.setStatus("403");
            resultDto.setMsg(e.getMessage());
        } catch(Exception e){
            log.debug("exception : {},", e);
            resultDto.setStatus("500");
            resultDto.setMsg("문제 수정 도중 문제가 발생하였습니다.");
        } finally{
            return resultDto;
        }

    }

    @Override
    public SolveAndUnsolveDto getSolveAndUnsolveList(String nickName) throws Exception{
        SolveAndUnsolveDto list = new SolveAndUnsolveDto();
        List<ProblemForInsertDto> solveList = null;
        List<ProblemForInsertDto> unSolveList = null;
        solveList = mapper.getSolveListByUserNickname(nickName);
        unSolveList = mapper.getUnsolveListByUserNickname(nickName);
        if(solveList == null) solveList = Collections.EMPTY_LIST;
        if(unSolveList == null) unSolveList = Collections.EMPTY_LIST;
        list.setSolveList(solveList);
        list.setSolveCount(solveList.size());
        list.setUnSolveList(unSolveList);
        list.setUnSolveCount(unSolveList.size());
        return list;
    }

    @Override
    public List<UserProblemCateDto> getProblemCateList(String nickName) throws Exception {
        List<UserProblemCateDto> list = null;
        list = mapper.getProblemCateByNickname(nickName);
        if(list == null) list = Collections.EMPTY_LIST;
        return list;
    }
}

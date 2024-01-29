package com.ssafy.codearena.problem.service;


import com.ssafy.codearena.problem.dto.ProblemWithSearchDto;
import com.ssafy.codearena.problem.dto.ProblemListDto;
import com.ssafy.codearena.problem.dto.ResultDto;
import com.ssafy.codearena.problem.dto.SearchDto;
import com.ssafy.codearena.problem.mapper.ProblemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProblemServiceImpl implements ProblemService{

    private final ProblemMapper mapper;
    @Override
    public ResultDto getProblemList(HashMap<String, String> map) {
        ResultDto resultDto = new ResultDto();
        HashMap<String, String> hashMap = new HashMap<>();
        ProblemListDto problemListDto = new ProblemListDto();
        try{
            int spp = Integer.parseInt(map.get("spp"));
            String cate = map.get("cate");
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
            hashMap.put("word", map.get("word"));
            int totalItemCount = mapper.problemCount(hashMap);
            int totalPageCount = 1;
            if(totalItemCount > spp) totalPageCount = (totalItemCount%spp) == 0 ? totalItemCount/spp : totalItemCount/spp+1;
            int pgno = Integer.parseInt(map.get("pgno"));
            if(pgno > totalPageCount) pgno = totalPageCount;
            String orderBy = "";
            switch(map.get("orderBy")){
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
}

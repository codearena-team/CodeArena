package com.ssafy.codearena.board.service;

import com.ssafy.codearena.board.dto.*;
import com.ssafy.codearena.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@Service
public class BoardServiceImpl implements BoardService{

    private final BoardMapper boardMapper;


    @Override
    public BoardResultDto boardDetail(String boardId) {

        BoardResultDto boardResultDto = new BoardResultDto();

        boardResultDto.setStatus("200");
        boardResultDto.setMsg("조회 성공");


        try {

            BoardDetailDto boardDetailDto = boardMapper.boardDetail(boardId);
            boardMapper.hitUpdate(boardId); //조회수 증가
            boardResultDto.setData(boardDetailDto);

        }
        catch (Exception e) {
            
            boardResultDto.setStatus("500");
            boardResultDto.setMsg("Server Internal Error");
        }

        return boardResultDto;
    }

    @Override
    public BoardResultDto boardList(Map<String, String> map) {

        BoardResultDto boardResultDto = new BoardResultDto();

        Map<String, Object> param = new HashMap<String, Object>();    //쿼리 매개변수
        param.put("word", map.get("word") == null ? "" : map.get("word"));  //검색조건 있다면 put
        param.put("boardType", map.get("boardType") == null ? "" : map.get("boardType"));   //질문 타입도 검색조건 default : 1
        param.put("langType", map.get("langType") == null ? "" : map.get("langType"));     //언어 타입도 검색조건
        int currentPage = Integer.parseInt(map.get("pgno") == null ? "1" : map.get("pgno"));    //특정 페이지 번호 요청이 없다면 1번
        int sizePerPage = Integer.parseInt(map.get("spp") == null ? "15" : map.get("spp"));


        int start = currentPage * sizePerPage - sizePerPage;    //쿼리로 불러올 인덱스 번호 지정

        param.put("start", start);
        param.put("listSize", sizePerPage);


        String key = map.get("key");
        param.put("key", key == null ? "" : key);
//        if("userId".equals(key)) {
//            param.put("key", key == null ? "" : "userId");
//        }

        map.get("sortType");
        param.put("sortType", map.get("sortType"));


//        log.info(map.get("key") + " : " + map.get("word"));

        try {
            List<BoardDetailDto> list = boardMapper.boardList(param);
            int totalBoardCount = boardMapper.getTotalBoardCount(param);
            int totalPageCount = (totalBoardCount - 1) / sizePerPage + 1;

            BoardListDto boardListDto = new BoardListDto();
            boardListDto.setArticles(list);
            boardListDto.setCurrentPage(currentPage);
            boardListDto.setTotalPageCount(totalPageCount);

            boardResultDto.setStatus("200");
            boardResultDto.setMsg("게시글 목록 불러오기 성공");
            boardResultDto.setData(boardListDto);
        }
        catch (Exception e) {

            boardResultDto.setStatus("500");
            boardResultDto.setMsg("Server Internal Error");
            boardResultDto.setData(null);

        }

        return boardResultDto;

    }

    @Override
    public BoardResultDto boardWrite(BoardWriteDto boardWriteDto) {

        BoardResultDto boardResultDto = new BoardResultDto();

        boardResultDto.setStatus("201");
        boardResultDto.setMsg("게시판 글쓰기 성공");

        try {

            log.info(String.valueOf(boardWriteDto));
            boardMapper.boardWrite(boardWriteDto);
            boardResultDto.setData(null);
        }
        catch (Exception e) {

            boardResultDto.setStatus("500");
            boardResultDto.setMsg("Server Internal Error");
        }

        return boardResultDto;
    }

    @Override
    public BoardResultDto updateHit(String boardId) {

        return null;
    }

    @Override
    public BoardResultDto boardUpdate(BoardUpdateDto boardUpdateDto) {

        BoardResultDto boardResultDto = new BoardResultDto();

        boardResultDto.setStatus("200");
        boardResultDto.setMsg("게시글 수정 성공");
        boardResultDto.setData(null);

        try {

            int cnt = boardMapper.boardUpdate(boardUpdateDto);
            if(cnt == 0) {

                boardResultDto.setStatus("404");
                boardResultDto.setMsg("게시글 번호 혹은 유저 아이디 재확인 필요");
            }
        }
        catch (Exception e) {
            boardResultDto.setStatus("500");
            boardResultDto.setMsg("Server Internal Error");
        }

        return boardResultDto;
    }

    @Override
    public BoardResultDto boardDelete(String boardId) {

        BoardResultDto boardResultDto = new BoardResultDto();

        boardResultDto.setStatus("200");
        boardResultDto.setMsg("게시글 삭제 성공");
        boardResultDto.setData(null);

        try {

            boardMapper.boardDelete(boardId);
        }
        catch (Exception e) {
            boardResultDto.setStatus("500");
            boardResultDto.setData("Server Internal Error");
        }

        return boardResultDto;
    }
}

package com.codearena.judge.service;

import com.codearena.judge.dto.JudgeResultDto;
import com.codearena.judge.dto.JudgeValidationCheckDto;
import com.codearena.judge.dto.TestCaseDto;
import com.codearena.judge.mapper.JudgeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
@RequiredArgsConstructor
public class JudgeServiceImpl implements JudgeService{

    private final JudgeMapper mapper;

    @Override
    public JudgeResultDto validationCheck(JudgeValidationCheckDto userInput) {
        JudgeResultDto judgeResultDto = new JudgeResultDto();
        judgeResultDto.setStatus("200");
        judgeResultDto.setMsg("문제 유효성 검사 완료");

        String submitStatus = "";

        if(checkSystemCallInCode(userInput.getProblemValidationCode())) {
            judgeResultDto.setStatus("404");
            judgeResultDto.setMsg("코드 내 시스템 콜 감지");
            return judgeResultDto;
        }

        try {
            // problemExInput, Output 를 테스트케이스에 포함시킴
            List<TestCaseDto> testCase = userInput.getTestCase();
            testCase.add(new TestCaseDto(userInput.getProblemExInput(), userInput.getProblemExOutput()));

            long timeLimit = Long.parseLong(userInput.getProblemTime());

            String path = UUID.randomUUID().toString();

            String cmd = "java" + path + "/solution.java";

            // 폴더 생성하기
            createFolder(path);
            // 코드 파일 생성하기 (solution.java)
            createCodeFile(userInput.getProblemValidationCode(), path);
            // 런타임 생성하기
            Runtime runtime = Runtime.getRuntime();
            // 코드 검증하기
            String result = validate(runtime, cmd, testCase, timeLimit, submitStatus, path, userInput);


        } catch (Exception e) {
            log.debug("Exception : {}" , e);
            judgeResultDto.setStatus("500");
            judgeResultDto.setMsg("서버 내부 에러");
        }

        judgeResultDto.setData(submitStatus);

        return judgeResultDto;
    }

    public void createFolder(String path) {
        // 폴더 생성
        File Folder = new File(path);

        // 해당 디렉토리가 없을경우 디렉토리를 생성합니다.
        if (!Folder.exists()) {
            try{
                log.info("폴더가 생성되었습니다. {}" , Folder.mkdir());
            }
            catch(Exception e){
                log.debug("createFolder Exception : {}", e);
            }
        }else {
            log.debug("Exception : 이미 폴더가 생성되어 있습니다");
        }
    }

    public void createCodeFile(String code, String path) throws IOException {
        File file = new File(path, "solution.java");

        log.info("파일 생성 중. {}");
        log.info("path : {}" + path);

        if(file.createNewFile());

        FileWriter fw = new FileWriter(file);
        fw.write(code);
        fw.close();
    }

    public String validate(Runtime runtime, String cmd, List<TestCaseDto> testCase, Long timeLimit, String submitStatus, String path, JudgeValidationCheckDto userInput) throws Exception {
        Double timeSum = 0.0;

        boolean isError = false;

        // TC 불러왔으면 검사하는 로직 수행하기
        for (int tc = 0; tc < testCase.size(); tc++) {
            // 컴파일 하고 실행시키기
            Process process = runtime.exec(cmd);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()));
            bw.write(testCase.get(tc).getInput());
            bw.flush();
            double beforeTime = System.currentTimeMillis();
            bw.close();

            if (!process.waitFor(timeLimit + 2000 + 1000, TimeUnit.MILLISECONDS)) {
                submitStatus = "시간 초과";
                isError = true;
                break;
            }
            double afterTime = System.currentTimeMillis();

            BufferedReader bf = new BufferedReader(new InputStreamReader(process.getInputStream(), "MS949"));
            String str = bf.readLine();

            timeSum += (afterTime - beforeTime) / 1000;

//            System.out.printf("tc :%d  시간 측정 결과 : %.3f\n", tc, (afterTime-beforeTime)/1000);

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));

            if (process.exitValue() != 0) {
                String error = errorReader.readLine();
                String[] frags = error.split(" ");
                isError = true;

                switch (frags[0]) {
                    case "Exception":
                        log.debug("error : {}", error);
                        submitStatus = "Exception : " + frags[4];
                        break;
                    case "Error:":
                        log.debug("error : {}", error);
                        submitStatus = "컴파일 에러";
                        break;
                }
                break;
            }

            if (!testCase.get(tc).getOutput().equals(str)) {
                submitStatus = "틀렸습니다";
                isError = true;
                break;
            }

            log.info("errorReader.readLine() : {}", errorReader.readLine());
            log.info("ProcessExitValue : {}", process.exitValue());

            // 결과 값 출력 & 저장
            log.info("str : {}", str);
        }

        String timeResult;

        // 에러 발생 시
        if (isError) {
            timeResult = null;
        } else {
            timeSum *= 1000;
            timeSum /= testCase.size();
            timeResult = timeSum + "";
        }

        // 정답 여부를 판단 했으면 저장하기
        HashMap<String, String> result = new HashMap<>();

        result.put("result", submitStatus);
        result.put("time", timeResult);

        File dirFile = new File(path);
        File javaFile = new File(path, "solution.java");

        // 결과 반영 했으면 디렉토리 삭제하기
        // 내부 파일부터 삭제하고 디렉토리 삭제
        javaFile.delete();
        dirFile.delete();

        return submitStatus;
    }

    public boolean checkSystemCallInCode(String code) {
        Pattern pattern = Pattern.compile("(?<!\\w)Runtime\\.getRuntime\\(\\)\\.exec\\(\"[^\"]+\"\\)");
        Matcher matcher = pattern.matcher(code);

        // 만약 코드에서 SystemCall 패턴을 확인하면 True를 반환합니다.
        return (matcher.find());
    }
}

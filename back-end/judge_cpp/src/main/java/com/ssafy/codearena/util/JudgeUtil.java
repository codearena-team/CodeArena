package com.ssafy.codearena.util;

import com.ssafy.codearena.judge.dto.JudgeProblemInfoDto;
import com.ssafy.codearena.judge.dto.JudgeValidateResultDto;
import com.ssafy.codearena.judge.dto.TestCaseDto;
import com.ssafy.codearena.judge.mapper.JudgeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class JudgeUtil {

    private final JudgeMapper mapper;

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
        File file = new File(path, "Solution.cpp");

        log.info("파일 생성 중. {}");
        log.info("path : {}" + path);

        if(file.createNewFile());

        FileWriter fw = new FileWriter(file);
        log.info("code : {}", code);
        fw.write(code);
        fw.close();
    }

    public boolean checkSystemCallInCode(String code) {
        Pattern pattern = Pattern.compile("(?<!\\w)Runtime\\.getRuntime\\(\\)\\.exec\\(\"[^\"]+\"\\)");
        Matcher matcher = pattern.matcher(code);

        // 만약 코드에서 SystemCall 패턴을 확인하면 True를 반환합니다.
        return (matcher.find());
    }

    public JudgeProblemInfoDto getProblemInfo(String problemId) {
        JudgeProblemInfoDto judgeProblemInfoDto = new JudgeProblemInfoDto();

        List<TestCaseDto> testCaseList = new ArrayList<>();

        try {
            judgeProblemInfoDto = mapper.getProblemInfo(problemId);
            testCaseList = mapper.getTestCase(problemId);
            judgeProblemInfoDto.setTestCaseList(testCaseList);
        } catch (Exception e) {
            log.debug("Exception : {} ", e);
        }

        return judgeProblemInfoDto;
    }

    /**
     *
     * @param cmd : 런타임에서 실행할 명령
     * @param testCase : 채점 테스트 케이스
     * @param timeLimit : 시간제한
     * @param path : 디렉토리 생성 경로
     * @return JudgeValidateResultDto
     * @throws Exception
     */
    public JudgeValidateResultDto validate(String cmd,
                                           List<TestCaseDto> testCase,
                                           Long timeLimit,
                                           String path) throws Exception {

        // 런타임 생성하기
        Runtime runtime = Runtime.getRuntime();

        JudgeValidateResultDto result = new JudgeValidateResultDto();

        result.setSolve(true);
        // 실행 결과 담기
        String msg = "맞았습니다.";
        // 시간의 총 합.
        double timeSum = 0.0;
        // 에러가 발생 했는지
        boolean isError = false;

        String wrongTC = null;

        cmd = "g++ -o ./" + path + "/Solution.out ./" + path +"/Solution.cpp";

        Process process = runtime.exec(cmd);
        process.waitFor();

        cmd = "./" + path +"/Solution.out";

        // TC 불러왔으면 검사하는 로직 수행하기
        for (int tc = 0; tc < testCase.size(); tc++) {
            // 컴파일 하고 실행시키기
            process = runtime.exec(cmd);

            // BufferedWriter로 Output 스트림에 실행 결과를 담기
            // 실행 결과를
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()));
            bw.write(testCase.get(tc).getInput());
            bw.flush();
            bw.close();

            double beforeTime = System.currentTimeMillis();

            if (!process.waitFor(timeLimit + 1000, TimeUnit.MILLISECONDS)) {
                msg = "시간 초과";
                wrongTC = testCase.get(tc).getTid();
                isError = true;
                break;
            }

            double afterTime = System.currentTimeMillis();

            BufferedReader bf = new BufferedReader(new InputStreamReader(process.getInputStream(), "MS949"));
            StringBuilder sb = new StringBuilder();
            String str = null;

            while((str = bf.readLine()) != null) {
                sb.append(str).append("\n");
            }

            timeSum += (afterTime - beforeTime) / 1000;

            log.info("tc : {} 시간 측정 결과 : {}\n", tc, (afterTime-beforeTime)/1000);

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            log.info("processExitValue : {}  (0 = 정상작동)", process.exitValue());

            if (process.exitValue() != 0) {
                String error = errorReader.readLine();
                log.info("errorMsg : {}", error);

                String[] frags = error.split(" ");

                isError = true;
                wrongTC = testCase.get(tc).getTid();

                msg = "컴파일 에러";

                switch (frags[0]) {
                    case "warning":
                        log.debug("error : {}", error);
                        msg = "런타임 에러";
                        break;
                    case "error:":
                        log.debug("error : {}", error);
                        msg = "컴파일 에러";
                        break;
                }
                break;
            }
            String tcTrim = testCase.get(tc).getOutput();
            String sbTrim = sb.toString().trim();

            tcTrim = tcTrim.replaceAll("\r", "");
            sbTrim = sbTrim.replaceAll("\r", "");

            log.info("비교 결과 : {}" , tcTrim.equals(sbTrim));

            if (!tcTrim.equals(sbTrim)) {
                msg = "틀렸습니다";
                wrongTC = testCase.get(tc).getTid();
                isError = true;
                break;
            }

            log.info("errorReader.readLine() : {}", errorReader.readLine());
            log.info("ProcessExitValue : {}", process.exitValue());

            // 결과 값 출력 & 저장
            log.info("str : {}", str);
        }

        String timeResult;

        // 에러 발생 시 시간은 없음
        if (isError) {
            result.setSolve(false);
            timeResult = null;

        } else {
            timeSum *= 1000;
            timeSum /= testCase.size();
            timeSum = Math.floor(timeSum);
            timeResult = (int)timeSum + "";
        }

        result.setMsg(msg);
        result.setSolve(!isError);
        result.setTime(timeResult);
        result.setWrongTestCaseNo(wrongTC);

        File dirFile = new File(path);
        File cppFile = new File(path, "Solution.cpp");
        File exeFile = new File(path, "Solution.out");

        // 결과 반영 했으면 디렉토리 삭제하기
        // 내부 파일부터 삭제하고 디렉토리 삭제
        exeFile.delete();
        cppFile.delete();
        dirFile.delete();

        return result;
    }
}


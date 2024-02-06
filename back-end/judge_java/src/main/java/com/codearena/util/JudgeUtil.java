package com.codearena.util;

import com.codearena.judge.dto.JudgeValidateResultDto;
import com.codearena.judge.dto.TestCaseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

import java.io.*;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Configuration
@Slf4j
public class JudgeUtil {

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

    public boolean checkSystemCallInCode(String code) {
        Pattern pattern = Pattern.compile("(?<!\\w)Runtime\\.getRuntime\\(\\)\\.exec\\(\"[^\"]+\"\\)");
        Matcher matcher = pattern.matcher(code);

        // 만약 코드에서 SystemCall 패턴을 확인하면 True를 반환합니다.
        return (matcher.find());
    }

    public JudgeValidateResultDto validate(Runtime runtime,
                                           String cmd,
                                           List<TestCaseDto> testCase,
                                           Long timeLimit,
                                           String path) throws Exception {

        JudgeValidateResultDto result = new JudgeValidateResultDto();

        result.setSolve(true);
        // 실행 결과 담기
        String msg = "";
        // 시간의 총 합.
        double timeSum = 0.0;
        // 에러가 발생 했는지
        boolean isError = false;

        // TC 불러왔으면 검사하는 로직 수행하기
        for (int tc = 0; tc < testCase.size(); tc++) {
            // 컴파일 하고 실행시키기
            Process process = runtime.exec(cmd);

            // BufferedWriter로 Output 스트림에 실행 결과를 담기
            // 실행 결과를
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()));
            bw.write(testCase.get(tc).getInput());
            bw.flush();
            bw.close();

            double beforeTime = System.currentTimeMillis();

            if (!process.waitFor(timeLimit + 2000 + 1000, TimeUnit.MILLISECONDS)) {
                msg = "시간 초과";
                isError = true;
                break;
            }

            double afterTime = System.currentTimeMillis();

            BufferedReader bf = new BufferedReader(new InputStreamReader(process.getInputStream(), "MS949"));
            String str = bf.readLine();

            timeSum += (afterTime - beforeTime) / 1000;

            log.info("tc : {} 시간 측정 결과 : {}\n", tc, (afterTime-beforeTime)/1000);

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));

            if (process.exitValue() != 0) {
                String error = errorReader.readLine();
                String[] frags = error.split(" ");
                isError = true;

                switch (frags[0]) {
                    case "Exception":
                        log.debug("error : {}", error);
                        msg = "Exception : " + frags[4];
                        break;
                    case "Error:":
                        log.debug("error : {}", error);
                        msg = "컴파일 에러";
                        break;
                }
                break;
            }

            if (!testCase.get(tc).getOutput().equals(str)) {
                msg = "틀렸습니다";
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
            timeResult = timeSum + "";
        }

        result.setMsg(msg);
        result.setTotalTime(timeResult);

        File dirFile = new File(path);
        File javaFile = new File(path, "solution.java");

        // 결과 반영 했으면 디렉토리 삭제하기
        // 내부 파일부터 삭제하고 디렉토리 삭제
        javaFile.delete();
        dirFile.delete();

        return result;
    }
}

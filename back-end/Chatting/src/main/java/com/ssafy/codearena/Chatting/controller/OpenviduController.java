
package com.ssafy.codearena.Chatting.controller;
import io.openvidu.java.client.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import io.openvidu.java.client.Session;
import java.util.HashMap;
import java.util.Map;
@Tag(name = "Openvidu 사용을 위한 컨트롤러", description = "Openvidu 세션 생성 및 연결요청 API")
@Slf4j
@RestController
@RequestMapping("/vidu")
public class OpenviduController {
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;
    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;
    private OpenVidu openvidu;
    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }
    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @Operation(summary = "방 생성", description = "파라메터로 받은 customSessionId 값을 기준으로 방 생성")
    @Parameter(name = "customSessionId", description = "생성하고자 하는 방의 커스텀 세션 ID값")
    @PostMapping("/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();

        log.info(String.valueOf(properties));
        try {
            Session session = openvidu.createSession(properties);
            return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
        }
        catch (Exception e) {
            log.error("Exception Msg", e);
            return new ResponseEntity<>("이미 존재하는 게임방 ID입니다.", HttpStatus.OK);
        }

    }
    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @Operation(summary = "방 입장", description = "해당하는 세션ID를 가진 방에 입장")
    @Parameters(value = {
            @Parameter(name = "sessionId", description = "PathVariable"),
            @Parameter(name = "Connection Properties", description = "연결에 필요한 설정값")
    })
    @ApiResponse(responseCode = "200", description = "The Token associated to the Connection")
    @PostMapping("/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = null;

        try {

            session = openvidu.getActiveSession(sessionId);
        }
        catch (Exception e) {

            log.info("세션을 가져오는 과정에서 문제가 발생했습니다.");
            log.error("Exception Msg", e);
            return new ResponseEntity<>("입장코드를 통해 세션을 불러오는 과정에서 예기치 못한 오류가 발생했습니다.", HttpStatus.OK);
        }

        if (session == null) {
            return new ResponseEntity<>("해당하는 방이 존재하지 않습니다.", HttpStatus.NOT_FOUND);
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();

        Connection connection = null;
        try {

            connection = session.createConnection(properties);
        }
        catch (Exception e) {

            log.info("스트리밍 세션에 접속하는 과정에서 예기치 못한 오류가 발생했습니다.");
            log.error("Exception Msg", e);
            return new ResponseEntity<>("스트리밍 세션에 접속하는 과정에서 예기치 못한 오류가 발생했습니다.", HttpStatus.OK);
        }
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }
}

package com.ssafy.codearena.util;

import com.ssafy.codearena.user.dto.TokenDataDto;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Map;



@Component
@Slf4j
public class JwtUtil {

    @Value("${jwt.salt}")
    private String salt;

    @Value("${jwt.access-token.expiretime}")
    private long accessTokenExpireTiem;

    @Value("${jwt.refresh-token.expiretime}")
    private long refreshTokenExpireTime;

    public String createAccessToken(TokenDataDto tokenDataDto) {
        return create(tokenDataDto, "access-token", accessTokenExpireTiem);
    }

    //	AccessToken에 비해 유효기간을 길게 설정.
    public String createRefreshToken(TokenDataDto tokenDataDto) {
        return create(tokenDataDto, "refresh-token", refreshTokenExpireTime);
    }

    //	Token 발급
//		key : Claim에 셋팅될 key 값
//		value : Claim에 셋팅 될 data 값
//		subject : payload에 sub의 value로 들어갈 subject값
//		expire : 토큰 유효기간 설정을 위한 값
//		jwt 토큰의 구성 : header + payload + signature
    private String create(TokenDataDto tokenDataDto, String subject, long expireTime) {
//		Payload 설정 : 생성일 (IssuedAt), 유효기간 (Expiration),
//		토큰 제목 (Subject), 데이터 (Claim) 등 정보 세팅.
        Claims claims = Jwts.claims()
                .setSubject(subject) // 토큰 제목 설정 ex) access-token, refresh-token
                .setIssuedAt(new Date()) // 생성일 설정
                .setExpiration(new Date(System.currentTimeMillis() + expireTime)); // 만료일 설정 (유효기간)

//		저장할 data의 key, value
        claims.put("userEmail", tokenDataDto.getUserEmail());
        claims.put("userId" , tokenDataDto.getUserId());
        claims.put("userNickname", tokenDataDto.getUserNickname());
        claims.put("speedRating", tokenDataDto.getSpeedRating());
        claims.put("effiRating", tokenDataDto.getEffiRating());


        String jwt = Jwts.builder()
                .setHeaderParam("typ", "JWT").setClaims(claims) // Header 설정 : 토큰의 타입, 해쉬 알고리즘 정보 세팅.
                .signWith(SignatureAlgorithm.HS256, this.generateKey()) // Signature 설정 : secret key를 활용한 암호화.
                .compact(); // 직렬화 처리.

        return jwt;
    }

    //	Signature 설정에 들어갈 key 생성.
    private byte[] generateKey() {
        byte[] key = null;
        try {
//			charset 설정 안하면 사용자 플랫폼의 기본 인코딩 설정으로 인코딩 됨.
            key = salt.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            if (log.isInfoEnabled()) {
                e.printStackTrace();
            } else {
                log.error("Making JWT Key Error ::: {}", e.getMessage());
            }
        }
        return key;
    }

    // 토큰 검증 로직 : parseClaimsJws -> 문제없으면 return true 에러 발생 시 return false
    public boolean checkToken(String token) {
        try {
//			Json Web Signature? 서버에서 인증을 근거로 인증정보를 서버의 private key로 서명 한것을 토큰화 한것
//			setSigningKey : JWS 서명 검증을 위한  secret key 세팅
//			parseClaimsJws : 파싱하여 원본 jws 만들기

            Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(token);
//			Claims 는 Map의 구현체 형태
            log.debug("토큰 확인 성공 claims: {}", claims);
            return true;
        } catch(SecurityException | MalformedJwtException | SignatureException e) {
            log.error("유효하지 않는 JWT signature 입니다.");
        } catch (ExpiredJwtException e) {
            log.error("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.error("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.error("잘못된 JWT 토큰입니다.");
        }
        return false;
    }

    public String getUserEmail(String authorization) {
        Jws<Claims> claims = null;
        try {
            claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(authorization);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        Map<String, Object> value = claims.getBody();
        log.info("value : {}", value);
        return (String) value.get("userEmail");
    }

    public boolean isAdmin(String token) throws JwtException{
        try {
            // 토큰 유효성 검사
            Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(token);

            String userId = (String) claims.getBody().get("userId");

            if (!"1".equals(userId)) throw new Exception("토큰 에러 발생");

        } catch (Exception e) {
            log.debug("exception : {} ", e);
            return false;
        }

        return true;
    }
}

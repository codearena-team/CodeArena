package com.ssafy.codearena.Chatting.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;
import java.util.Map;




@Component
@Slf4j
public class JWTUtil {

    @Value("${jwt.salt}")
    private String salt;

    @Value("${jwt.access-token.expiretime}")
    private long accessTokenExpireTiem;

    @Value("${jwt.refresh-token.expiretime}")
    private long refreshTokenExpireTime;


    private Claims decodeToken(String token){
        Claims claims = null;
        try{
            claims = Jwts.parser().setSigningKey(salt.getBytes())
                    .parseClaimsJws(token)
                    .getBody();

        }catch(SecurityException | MalformedJwtException | SignatureException e) {
            claims = null;
            log.error("유효하지 않는 JWT signature 입니다.");
        } catch (ExpiredJwtException e) {
            claims = null;
            log.error("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            claims = null;
            log.error("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            claims = null;
            log.error("잘못된 JWT 토큰입니다.");
        }
        return claims;
    }

    public String getUserId(String token){
        Claims claims = decodeToken(token);
        return (String) claims.get("userId");
    }
}

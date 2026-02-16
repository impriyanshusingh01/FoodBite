package com.foodBite.FoodBite.util;

import com.foodBite.FoodBite.entity.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    private SecretKey secretKey;

    @PostConstruct
    public void generateKey() {
        secretKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(UserEntity userEntity, UserDetails userDetails){
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .claim("userId", userEntity.getId())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(secretKey)
                .compact();
    }

    public String getEmailFromToken(String token){
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();

    }

    public boolean validateToken(String token, UserDetails userDetails){
        String email = getEmailFromToken(token);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getExpiration().before(new Date());
    }
}

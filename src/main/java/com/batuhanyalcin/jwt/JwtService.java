package com.batuhanyalcin.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtService {

    public static final String SECRET_KEY ="aCdvtrjHA82BCuLyC9dsJ3dH+YeuvScaTSWmYWYbRaA=";

    public String generateToken(UserDetails userDetails){
        Map<String , Object> claimsMap = new HashMap<>();
         return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*2))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Key getKey(){
        byte[] key = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(key);
    }

    public <T> T exportToken(String token, Function<Claims,T> claimsFunc){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token).getBody();
        return claimsFunc.apply(claims);
    }

    public String getUsernameByToken(String token){
        return  exportToken(token,Claims::getSubject);
    }

    public boolean isTokenExpired(String token){
        Date expiredDate =  exportToken(token,Claims::getExpiration);
        return new Date().before(expiredDate);
    }

}

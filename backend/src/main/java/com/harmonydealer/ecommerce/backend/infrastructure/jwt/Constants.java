package com.harmonydealer.ecommerce.backend.infrastructure.jwt;

import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;

public class Constants {
    public static final String HEADER_AUTHORIZATION = "Authorization";
    public static final String TOKEN_BEARER_PREFIX = "Bearer ";

    public static final String SUPER_SECRET_KEY = "fniZhrPyN7rG4v6H0b45v3DGulvN907STIM4qiOVXhAJMBJCcvZjv8A9CP50s5qqrOKF4vVtZXB";

    public static final long TOKEN_EXPIRATION_TIME = 1500000;

    public static Key getSignedKey(String secretKey){
        byte [] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
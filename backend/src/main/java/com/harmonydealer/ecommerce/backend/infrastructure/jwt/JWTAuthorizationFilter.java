package com.harmonydealer.ecommerce.backend.infrastructure.jwt;


import com.harmonydealer.ecommerce.backend.infrastructure.service.CustomUserDetailService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static com.harmonydealer.ecommerce.backend.infrastructure.jwt.Constants.HEADER_AUTHORIZATION;
import static com.harmonydealer.ecommerce.backend.infrastructure.jwt.JWTValidate.*;

@Slf4j
@Component
public class JWTAuthorizationFilter extends OncePerRequestFilter {
    private CustomUserDetailService customUserDetailService;

    public JWTAuthorizationFilter(CustomUserDetailService customUserDetailService) {
        this.customUserDetailService = customUserDetailService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            if(tokenExists(request, response)){
                Claims claims = JWTValid(request);
                if(claims.get("authorities") != null){
                    setAuthentication(claims, customUserDetailService);
                }else {
                    SecurityContextHolder.clearContext();
                }
            }else {
                SecurityContextHolder.clearContext();
            }
            filterChain.doFilter(request, response);

        }catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException e){
            log.info("doFilterInternal {}", e.toString());
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.sendError(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

    }
}

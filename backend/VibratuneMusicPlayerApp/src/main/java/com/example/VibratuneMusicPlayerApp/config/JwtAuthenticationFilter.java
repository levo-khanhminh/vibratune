package com.example.VibratuneMusicPlayerApp.config;

import com.example.VibratuneMusicPlayerApp.service.JwtService;
import com.example.VibratuneMusicPlayerApp.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component

public class JwtAuthenticationFilter  extends OncePerRequestFilter {

    private final HandlerExceptionResolver handleExceptionResolver;
    private final JwtService jwtService;
    private final UserService userService;
    public JwtAuthenticationFilter(
            JwtService jwtService,

            HandlerExceptionResolver handlerExceptionResolver,
            UserService userService
    ) {
        this.jwtService = jwtService;

        this. handleExceptionResolver = handlerExceptionResolver;
        this.userService = userService;
    }
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull  HttpServletResponse response,@NonNull  FilterChain filterChain) throws ServletException, IOException {
        final String authHeader =  request.getHeader("Authorization");
        if(authHeader  == null ||  !authHeader.startsWith("Bearer")){
                filterChain.doFilter(request,response);
                return;
        }
        try {
            final String jwt = authHeader.substring(7);
            final String userEmail =  jwtService.extractUsername(jwt);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if(userEmail  != null ||  authentication == null){
                 UserDetails userDetails = userService.loadUserByUsername(userEmail);
                 if(jwtService.isTokenValid(jwt,userDetails)){
                     UsernamePasswordAuthenticationToken authToken =  new UsernamePasswordAuthenticationToken(
                             userDetails,null,userDetails.getAuthorities()
                     );
                     authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                     SecurityContextHolder.getContext().setAuthentication(authToken);
                 }
            }
            filterChain.doFilter(request,response);
        }catch(Exception ex){
                handleExceptionResolver.resolveException(request,response, null,ex);
        }
    }
}

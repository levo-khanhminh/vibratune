package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.DTO.*;
import com.example.VibratuneMusicPlayerApp.Enum.RoleName;
import com.example.VibratuneMusicPlayerApp.Enum.TokenType;
import com.example.VibratuneMusicPlayerApp.model.*;
import com.example.VibratuneMusicPlayerApp.repository.*;
import com.example.VibratuneMusicPlayerApp.response.AuthenticationResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwt;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;
    private  final JwtService jwtService;
    private final RoleRepository roleRepository;
    public AuthenticationResponse authenticate (LoginUserDTO loginUserDTO){
        User user =  userRepository.findByEmail(loginUserDTO.getEmail()).orElse(null);
        if(user  == null){
            throw new RuntimeException("User not found");
        }
        if(!passwordEncoder.matches(loginUserDTO.getPassword(), user.getPassword())){
            throw new RuntimeException("Error with logging in");
        }
        if(!user.isVerified()){
            throw new RuntimeException("Account not verified. Please verify your account");
        }
        String jwtToken  = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user,jwtToken);
        Authentication authentication =  authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(loginUserDTO.getEmail(), loginUserDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }
    public User signUp(RegisterUserDTO registerUserDTO){
        Optional<User>  optionalUSer =  userRepository.findByEmail(registerUserDTO.getEmail());
        if(optionalUSer.isPresent()){
            throw new RuntimeException("Email already exists");
        }else{
            User  user =  new User(registerUserDTO.getEmail(), registerUserDTO.getUsername(), passwordEncoder.encode(registerUserDTO.getPassword()));
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
            sendVerificationEmail(user);
            //Default Type
            user.setRoles(List.of(roleRepository.findByRoleName(RoleName.LISTENER)));
            userRepository.save(user);
            return user;
        }
    }
    public void verifyUser(VerifyUserDTO verifyUserDTO){
        Optional<User> optionalUser =  userRepository.findByEmail(verifyUserDTO.getEmail());
        if(optionalUser.isPresent()){
            User user  = optionalUser.get();
            if(user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())){
                throw new RuntimeException("Verification Code Has Expired");
            }else if(user.getVerificationCode().equals(verifyUserDTO.getVerificationCode())){
                user.setVerified(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                userRepository.save(user);
            }else{
                throw new RuntimeException("Invalid Verification Code");
            }
        }
    }
    public void resendVerificationCode(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnabled()) {
                throw new RuntimeException("Account is already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }


    // Refresh Token Implmentation
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userRepository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isRefreshTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .isExpired(false)
                .isRevoked(false)
                .build();
        tokenRepository.save(token);
    }
    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private void sendVerificationEmail(User user) {
        String subject = "Account Verification";
        String verificationCode = "VERIFICATION CODE " + user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
        }
    }
    public void resetPassword(String email){
        Optional<User>  optionalUser =  userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user  = optionalUser.get();
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
            sendResetPasswordVerificationEmail(user);
            userRepository.save(user);
        }else{
            throw new RuntimeException("User not found with email - " + email);
        }
    }
    private void sendResetPasswordVerificationEmail(User user){
        String subject = "Reset Password Verification";
        String verificationCode = "VERIFICATION CODE " + user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Forgot Password Verification Code!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
        }
    }
    public void verifyUserResetPassword(ResetPasswordDTO resetPasswordDTO){
        Optional<User>  optionalUser =  userRepository.findByEmail(resetPasswordDTO.getEmail());
        if(optionalUser.isPresent()){
            User user =  optionalUser.get();
            if(user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())){
                throw new RuntimeException("Reset Password Verification Code has expired");
            }else{
                if(user.getVerificationCode().equals(resetPasswordDTO.getResetPasswordVerificationCode())){
                    user.setPassword(passwordEncoder.encode(resetPasswordDTO.getNewPassword()));
                    user.setVerificationCode(null);
                    user.setVerificationCodeExpiresAt(null);
                    userRepository.save(user);
                }else{
                    throw new RuntimeException("Verification Code does not match ");
                }
            }
        }else{
            throw new RuntimeException("User not found with email - " + resetPasswordDTO.getEmail());
        }
    }




    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}

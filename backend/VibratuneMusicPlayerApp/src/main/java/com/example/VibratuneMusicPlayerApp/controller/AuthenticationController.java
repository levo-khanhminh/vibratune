package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.DTO.*;
import com.example.VibratuneMusicPlayerApp.model.Artist;
import com.example.VibratuneMusicPlayerApp.model.Genre;
import com.example.VibratuneMusicPlayerApp.model.User;
import com.example.VibratuneMusicPlayerApp.response.AuthenticationResponse;
import com.example.VibratuneMusicPlayerApp.service.AuthenticationService;
import com.example.VibratuneMusicPlayerApp.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;
    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }


    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterUserDTO registerUserDto) {
       try{
           User registeredUser = authenticationService.signUp(registerUserDto);
           return ResponseEntity.ok(registeredUser);
       }catch(RuntimeException exception){
                return ResponseEntity.badRequest().body(exception.getMessage());
       }

    }

//    @PostMapping("/users")
//    public ResponseEntity<?>  addUser(@RequestBody UserDTO userDTO){
//      try{
//          User addedUser =  authenticationService.addUser(userDTO);
//          return ResponseEntity.ok(addedUser);
//      }catch(Exception ex) {
//          return ResponseEntity.badRequest().body(ex.getMessage());
//      }
//    }
//    @PostMapping("/artists")
//    public ResponseEntity<?>  addArtist(@RequestBody AddArtistDTO addArtistDTO) {
//            try {
//                Artist artist   =  this.authenticationService.addArtist(addArtistDTO);
//                return ResponseEntity.ok(artist);
//            }catch (Exception exception){
//                return ResponseEntity.badRequest().body(exception.getMessage());
//            }
//    }
//    @PostMapping("/genres")
//    public ResponseEntity<?>  addGenre(@RequestBody AddGenreDTO addGenreDTO) {
//        try {
//            Genre genre =  this.authenticationService.addGenre(addGenreDTO);
//            return ResponseEntity.ok(genre);
//        }catch (Exception exception){
//            return ResponseEntity.badRequest().body(exception.getMessage());
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDTO loginUserDto){
       try{
           AuthenticationResponse response = authenticationService.authenticate(loginUserDto);
           return ResponseEntity.ok(response);
       }catch(Exception ex){
                return ResponseEntity.badRequest().body(ex.getMessage());
       }

    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDTO verifyUserDto) {
        try {
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> sendResetPasswordVerificationCode(@RequestParam String email){
        try {
            authenticationService.resetPassword(email);
            return ResponseEntity.ok("Reset password verification code sent");
        }catch(Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PostMapping("/verifyResetPassword")
    public ResponseEntity<?> verifyResetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO){
        try {
            authenticationService.verifyUserResetPassword(resetPasswordDTO);
            return ResponseEntity.ok("Password has changed successfully");
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authenticationService.refreshToken(request, response);
    }
}

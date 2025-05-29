package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.model.User;
import com.example.VibratuneMusicPlayerApp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers(){
        return  ResponseEntity.ok(userService.getAllUsers());
    }
    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        System.out.println("me enpoint hit");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Principal class: " + authentication.getPrincipal().getClass());
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }

}

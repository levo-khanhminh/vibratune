package com.example.VibratuneMusicPlayerApp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class TestController {
    @GetMapping("/test")
    public ResponseEntity<?> testRequest(){
        return ResponseEntity.ok("Hello client this is the request from the  Test Controller");
    }
}

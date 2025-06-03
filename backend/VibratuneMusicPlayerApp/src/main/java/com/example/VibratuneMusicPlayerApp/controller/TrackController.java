package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.model.Track;
import com.example.VibratuneMusicPlayerApp.repository.TrackRepository;
import com.example.VibratuneMusicPlayerApp.service.TrackService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TrackController {
    private final TrackService trackService;
    public TrackController(TrackService trackService){
        this.trackService=trackService;
    }
    @GetMapping("/tracks")
    public List<Track>  getAllTracks(){
        return this.trackService.getAllTracks();
    }
}

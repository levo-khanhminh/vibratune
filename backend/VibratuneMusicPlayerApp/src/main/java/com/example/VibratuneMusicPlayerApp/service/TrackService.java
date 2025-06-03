package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.model.Track;
import com.example.VibratuneMusicPlayerApp.repository.TrackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrackService {
    private final TrackRepository trackRepository;

    public Track getTrackById(Long id) {
        return trackRepository.findById(id).orElseThrow();
    }
    public List<Track> getAllTracks(){
      return  (List<Track>) trackRepository.findAll();
    }

//    public List<Track>  getAllTracksByArtist(){
//
//    }
}

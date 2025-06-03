package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.DTO.AddArtistDTO;
import com.example.VibratuneMusicPlayerApp.model.Artist;
import com.example.VibratuneMusicPlayerApp.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArtistService {
    private final ArtistRepository artistRepository;
    public Artist addArtist(Artist artist){
               return this.artistRepository.save(artist);
    }
}

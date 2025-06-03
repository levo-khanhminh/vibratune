package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.DTO.ArtistDTO;
import com.example.VibratuneMusicPlayerApp.service.ArtistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ArtistController {
    private final ArtistService artistService;



    @GetMapping("/artists")
    public List<ArtistDTO> getAllArtists(){
       return  this.artistService.getAllArtists();
    }

    @GetMapping("/artists/{id}")
    public ResponseEntity<?> getArtistById(@PathVariable Long id){
       try {
           ArtistDTO artistDTO =  this.artistService.getArtistById(id);
           return ResponseEntity.ok(artistDTO);
       }catch(Exception ex){
           return ResponseEntity.badRequest().body(ex.getMessage());
       }
    }

}

package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.DTO.ArtistDTO;
import com.example.VibratuneMusicPlayerApp.DTO.DetailArtistDTO;
import com.example.VibratuneMusicPlayerApp.service.ArtistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/artists")
@RequiredArgsConstructor
public class ArtistController {
    private final ArtistService artistService;
    @GetMapping("/")
    public List<ArtistDTO> getAllArtists(){
       return  this.artistService.getAllArtists();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getArtistById(@PathVariable Long id){
       try {
           DetailArtistDTO dto =  this.artistService.getArtistById(id);
           return ResponseEntity.ok(dto);
       }catch(Exception ex){
           return ResponseEntity.badRequest().body(ex.getMessage());
       }
    }
    @GetMapping("/top")
    public ResponseEntity<?> getTopMonthlyListenersArtists(@RequestParam(name="count")  int count){
        return ResponseEntity.ok(this.artistService.getTopMonthlyArtists(count));
    }

}

package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.DTO.*;
import com.example.VibratuneMusicPlayerApp.model.*;
import com.example.VibratuneMusicPlayerApp.repository.*;
import com.example.VibratuneMusicPlayerApp.service.TempService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class TempController {
  private final TempService tempService;
   @PostMapping("/test/users")
    public ResponseEntity<?>  addUser(@RequestBody UserDTO userDTO){
        try {
            User user  = tempService.addUser(userDTO);
            TempResponseDTO res =  new TempResponseDTO();
            res.setId(user.getId());
            res.setOldId(user.getOldId());
            return ResponseEntity.ok(res);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
   }
    @PostMapping("/test/genres")
    public ResponseEntity<?>  addGenre( @RequestBody AddGenreDTO addGenreDTO){
        try {
            Genre  genre =  tempService.addGenre(addGenreDTO);
            TempResponseDTO res =  new TempResponseDTO();
            res.setId(genre.getId());
            res.setOldId(genre.getOldId());
            return ResponseEntity.ok(res);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PostMapping("/test/artists")
    public ResponseEntity<?>  addArtist(@RequestBody AddArtistDTO addArtistDTO){
        try {
            Artist artist =  tempService.addArtist(addArtistDTO);
            TempResponseDTO res =  new TempResponseDTO();
            res.setId(artist.getId());
            res.setOldId(artist.getOldId());
            return ResponseEntity.ok(res);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PostMapping("/test/albums")
    public ResponseEntity<?>  addArtist(@RequestBody AddAlbumDTO addAlbumDTO){
        try {
            Album album =  tempService.addAlbum(addAlbumDTO);
            TempResponseDTO res =  new TempResponseDTO();
            res.setId(album.getId());
            res.setOldId(album.getOldId());
            return ResponseEntity.ok(res);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PostMapping("/test/tracks")
    public ResponseEntity<?>  addTrack(@RequestBody AddTrackDTO addTrackDTO){
        try {
           Track track = tempService.addTrack(addTrackDTO);
            TempResponseDTO res =  new TempResponseDTO();
            res.setId(track.getId());
            res.setOldId(track.getOldId());
            return ResponseEntity.ok(res);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}

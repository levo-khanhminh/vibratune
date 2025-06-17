package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.DTO.AlbumDTO;
import com.example.VibratuneMusicPlayerApp.model.Album;
import com.example.VibratuneMusicPlayerApp.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/albums")
@RequiredArgsConstructor
public class AlbumController {
    @Autowired
    private  final AlbumService albumService;
    @GetMapping("/")
    public ResponseEntity<List<AlbumDTO>> getAllAlbums() {
        return ResponseEntity.ok(albumService.getAllAlbums());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getAlbumById(@PathVariable(name ="id") Long id){
        try {
            AlbumDTO dto =  albumService.getAlbumById(id);
            return ResponseEntity.ok(dto);
        }catch(Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @GetMapping("/top")
    public ResponseEntity<?> getTopAlbums(@RequestParam(name ="count") int count){
        return ResponseEntity.ok(albumService.getTopAlbums(count));
    }
}

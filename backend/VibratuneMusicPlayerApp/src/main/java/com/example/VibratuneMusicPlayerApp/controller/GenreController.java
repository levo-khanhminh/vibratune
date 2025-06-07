package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.DTO.GenreDTO;
import com.example.VibratuneMusicPlayerApp.model.Genre;
import com.example.VibratuneMusicPlayerApp.repository.GenreRepository;
import com.example.VibratuneMusicPlayerApp.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/genres")
@RequiredArgsConstructor
public class GenreController {
    private final GenreService genreService;


    @GetMapping("/")
    public ResponseEntity<List<GenreDTO>> getAllGenres(){
        return ResponseEntity.ok(this.genreService.getAllGenres());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?>  getGenreById(@PathVariable(name ="id") Long id){

        try {

            GenreDTO genreDTO =  this.genreService.getGenreById(id);
            return ResponseEntity.ok(genreDTO);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }


}

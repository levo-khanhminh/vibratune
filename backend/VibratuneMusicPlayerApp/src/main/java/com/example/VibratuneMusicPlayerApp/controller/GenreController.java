package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.DTO.GenreDTO;
import com.example.VibratuneMusicPlayerApp.model.Genre;
import com.example.VibratuneMusicPlayerApp.repository.GenreRepository;
import com.example.VibratuneMusicPlayerApp.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/genres")
@RequiredArgsConstructor
public class GenreController {
    private final GenreService genreService;


    @GetMapping
    public Page<GenreDTO> getAllGenres(@RequestParam(name="page", defaultValue="0")  int page ,
                                       @RequestParam(name="size", defaultValue="1") int size, @RequestParam(defaultValue="id,asc") String[] sort){

        Sort.Order  sortOrder  =  new Sort.Order(
                sort[1].equalsIgnoreCase("DESC") ?  Sort.Direction.DESC :  Sort.Direction.ASC, sort[0]
        );
        Pageable pageable = PageRequest.of(page,size, Sort.by(sortOrder));
        return this.genreService.getAllGenres(pageable);
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

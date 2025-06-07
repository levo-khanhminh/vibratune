package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.DTO.DTOMapper.DTOMapper;
import com.example.VibratuneMusicPlayerApp.DTO.GenreDTO;
import com.example.VibratuneMusicPlayerApp.model.Genre;
import com.example.VibratuneMusicPlayerApp.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;
    public List<GenreDTO>  getAllGenres(){
           return  this.genreRepository.findAll().stream().map(g ->
                           DTOMapper.mapToGenreDTO(g)
                    ).toList();
    }

    public GenreDTO  getGenreById(Long id){
        Genre genre  = this.genreRepository.findById(id).orElseThrow();
        return DTOMapper.mapToGenreDTO(genre);
    }
}

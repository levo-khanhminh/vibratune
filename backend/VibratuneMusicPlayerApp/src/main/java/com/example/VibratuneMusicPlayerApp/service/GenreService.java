package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.DTO.DTOMapper.DTOMapper;
import com.example.VibratuneMusicPlayerApp.DTO.GenreDTO;
import com.example.VibratuneMusicPlayerApp.model.Genre;
import com.example.VibratuneMusicPlayerApp.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;
    public Page<GenreDTO> getAllGenres(Pageable pageable){
           return  this.genreRepository.findAll(pageable).map(DTOMapper::mapToGenreDTO);
    }

    public GenreDTO  getGenreById(Long id){
        Genre genre  = this.genreRepository.findById(id).orElseThrow();
        return DTOMapper.mapToGenreDTO(genre);
    }
}

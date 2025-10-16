package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.DTO.AlbumDTO;
import com.example.VibratuneMusicPlayerApp.DTO.DTOMapper.DTOMapper;
import com.example.VibratuneMusicPlayerApp.DTO.TopAlbumDTO;
import com.example.VibratuneMusicPlayerApp.model.Album;
import com.example.VibratuneMusicPlayerApp.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository albumRepository;


    public AlbumDTO getAlbumById(Long id){
            Album album =  this.albumRepository.findById(id).orElseThrow();
            return DTOMapper.mapToAlbumDTO(album);
    }
    public Page<AlbumDTO> getAllAlbums(Pageable pageable){
        return this.albumRepository.findAll(pageable).map(DTOMapper::mapToAlbumDTO);
    }
    public List<AlbumDTO> getTopAlbums(int top){
      return  albumRepository.findAll(PageRequest.of(0, top)).getContent().stream().map(DTOMapper::mapToAlbumDTO).toList();
    }


}

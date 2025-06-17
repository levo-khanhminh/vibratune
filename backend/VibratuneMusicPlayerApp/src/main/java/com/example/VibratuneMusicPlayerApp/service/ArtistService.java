package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.DTO.AddArtistDTO;
import com.example.VibratuneMusicPlayerApp.DTO.ArtistDTO;
import com.example.VibratuneMusicPlayerApp.DTO.DTOMapper.DTOMapper;
import com.example.VibratuneMusicPlayerApp.DTO.DetailArtistDTO;
import com.example.VibratuneMusicPlayerApp.model.Artist;
import com.example.VibratuneMusicPlayerApp.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArtistService {
    private final ArtistRepository artistRepository;
    public Artist addArtist(Artist artist){
               return this.artistRepository.save(artist);
    }


    public DetailArtistDTO getArtistById(Long id){
        Artist artist =  this.artistRepository.findById(id).orElseThrow();
        return DTOMapper.mapToDetailArtistDTO(artist);
    }
    public List<ArtistDTO>  getAllArtists(){
        return this.artistRepository.findAll().stream().map(artist  ->
                        DTOMapper.mapToArtistDTO(artist)
                ).toList();
    }

    public List<ArtistDTO> getTopMonthlyArtists(int count) {
        return this.artistRepository
                .findAll(PageRequest.of(0, count, Sort.by(Sort.Direction.DESC, "monthlyListeners")))
                .getContent()
                .stream()
                .map(artist -> DTOMapper.mapToArtistDTO(artist)
                )
                .toList();
    }

}

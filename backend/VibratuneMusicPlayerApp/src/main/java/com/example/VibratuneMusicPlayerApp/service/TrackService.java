package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.DTO.DTOMapper.DTOMapper;
import com.example.VibratuneMusicPlayerApp.DTO.TrackDTO;
import com.example.VibratuneMusicPlayerApp.model.Track;
import com.example.VibratuneMusicPlayerApp.repository.TrackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrackService {
    private final TrackRepository trackRepository;

    public TrackDTO getTrackById(Long id) {
        Track track = trackRepository.findById(id).orElseThrow();
        return DTOMapper.mapToTrackDTO(track);
    }
    public Track getTrack(Long id){
        return this.trackRepository.findById(id).orElse(null);
    }


    @Cacheable("allTracks")
    public List<TrackDTO> getAllTracks(Pageable pageable){
        System.out.println("Querying from the DB ................");

      return  this.trackRepository.findAll(pageable).map(DTOMapper::mapToTrackDTO).getContent();
    }

    public List<TrackDTO> getTopTracks(int topRank){
        return this.trackRepository.findAll(PageRequest.of(0,topRank,  Sort.by(Sort.Direction.DESC, "trackRank")))
                .getContent()
                .stream()
                .map(t -> DTOMapper.mapToTrackDTO(t)).toList();
    }
    public List<TrackDTO>  getAllTracksByArtist(String artistName){
            return this.trackRepository.searchTracksByArtistName(artistName).
                    stream().map(t -> DTOMapper.mapToTrackDTO(t)).toList();
    }
    public List<TrackDTO> getAllTracksByAlbum(String albumName){
        return this.trackRepository.searchTracksByAlbumName(albumName).stream()
                .map(DTOMapper::mapToTrackDTO).toList();
    }
    public List<TrackDTO>  getAllTracksByTitle(String title){
        return this.trackRepository.searchTrackByTitle(title).stream()
                .map(DTOMapper::mapToTrackDTO).toList();
    }

    public List<TrackDTO>  getAllTracksByGenreId( Long genreId ){
        return this.trackRepository.getTracksByGenreId(genreId).stream().map(DTOMapper::mapToTrackDTO).toList();
    }

    public List<TrackDTO> getAllTracksByAlbumId(Long albumId){
        return this.trackRepository.getTracksByAlbumId(albumId).stream().map(DTOMapper::mapToTrackDTO).toList();
    }
    public List<TrackDTO> getAllTracksByArtistId(Long artistId){
        return this.trackRepository.getTracksByArtistId(artistId).stream().map(DTOMapper::mapToTrackDTO).toList();
    }


}

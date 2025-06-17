package com.example.VibratuneMusicPlayerApp.DTO;

import com.example.VibratuneMusicPlayerApp.model.Track;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DetailArtistDTO {
    private Long id;
    private String name;
    private String  biography;
    private String bigPictureUrl;
    private String mediumPictureUrl;
    private String smallPictureUrl;
    private long numberOfFans;
    private int monthlyListeners;
    private List<TrackDTO> tracks;
    private List<AlbumDTO>  albums;
}

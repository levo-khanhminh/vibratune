package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrackDTO   {
    private Long id;
    private String title;
    private String shortTitle;
    private String description;
    private String coverImageUrl;
    private String trackUrl;
    private String lyrics;
    private int duration;
    private int trackRank;
    private String trackPreviewUrl;
    private ArtistDTO artist;
}

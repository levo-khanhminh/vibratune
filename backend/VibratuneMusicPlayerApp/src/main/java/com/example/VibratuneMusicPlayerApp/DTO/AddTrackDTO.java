package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddTrackDTO {
    private Long id;
    private  int rank;
    private String title;
    private String shortTile;
    private int duration;
    private String preview;
    private  Long artist_id;
    private Long album_id;
}

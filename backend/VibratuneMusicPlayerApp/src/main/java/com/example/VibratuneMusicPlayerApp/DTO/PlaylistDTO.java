package com.example.VibratuneMusicPlayerApp.DTO;

import com.example.VibratuneMusicPlayerApp.model.Track;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PlaylistDTO {
    private Long id;
    private String name;
    private String coverImageUrl;
    private boolean isPrivate;
    private List<TrackDTO> tracks;
}

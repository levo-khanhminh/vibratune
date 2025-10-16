package com.example.VibratuneMusicPlayerApp.DTO;

import com.example.VibratuneMusicPlayerApp.model.Track;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistDTO {
    private Long id;
    private String name;
    private String coverImageUrl;
    private boolean isPrivate;
    private List<TrackDTO> tracks;
}

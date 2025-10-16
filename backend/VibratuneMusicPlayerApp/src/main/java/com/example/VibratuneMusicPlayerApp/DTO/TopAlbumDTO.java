package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopAlbumDTO {
    private Long id;
    private String name;
    private String bigCoverImageUrl;
    private String smallCoverImageUrl;
    private String mediumCoverImageUrl;
}

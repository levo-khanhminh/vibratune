package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddArtistDTO {
    private Long id;
    private String name;
    private String bigPictureUrl;
    private String mediumPictureUrl;
    private String smallPictureUrl;
    private long numberOfFans;
    private Long user_id;
}

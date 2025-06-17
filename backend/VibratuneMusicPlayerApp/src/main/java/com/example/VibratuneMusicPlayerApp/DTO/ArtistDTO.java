package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ArtistDTO {
    private Long id;
    private String name;
    private String  biography;
    private String bigPictureUrl;
    private String mediumPictureUrl;
    private String smallPictureUrl;
    private long numberOfFans;
    private int monthlyListeners;
}

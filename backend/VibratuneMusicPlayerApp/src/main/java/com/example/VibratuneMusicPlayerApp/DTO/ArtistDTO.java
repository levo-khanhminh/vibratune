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
public class ArtistDTO implements Serializable {
    private Long id;
    private String name;
    private String  biography;
    private String bigPictureUrl;
    private String mediumPictureUrl;
    private String smallPictureUrl;
    private long numberOfFans;
    private int monthlyListeners;
}

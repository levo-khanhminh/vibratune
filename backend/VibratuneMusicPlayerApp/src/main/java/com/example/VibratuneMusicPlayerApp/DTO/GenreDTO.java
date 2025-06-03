package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GenreDTO {
    private Long id;
    private String name;
    private String bigPicture;
    private String mediumPicture;
    private String  smallPicture;
}

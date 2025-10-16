package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GenreDTO {
    private Long id;
    private String name;
    private String bigPicture;
    private String mediumPicture;
    private String  smallPicture;
}

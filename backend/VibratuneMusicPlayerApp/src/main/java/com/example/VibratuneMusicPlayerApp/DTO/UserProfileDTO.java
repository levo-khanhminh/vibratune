package com.example.VibratuneMusicPlayerApp.DTO;

import com.example.VibratuneMusicPlayerApp.Enum.Gender;
import com.example.VibratuneMusicPlayerApp.model.Genre;
import lombok.*;

import java.time.LocalDate;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {
    private Long id;
    private String fullName;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String phoneNumber;
}

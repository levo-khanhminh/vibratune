package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VerifyUserDTO {
    private String email;
    private String verificationCode;
}

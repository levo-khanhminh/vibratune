package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginUserDTO {
    private String email;
    private String password;
}

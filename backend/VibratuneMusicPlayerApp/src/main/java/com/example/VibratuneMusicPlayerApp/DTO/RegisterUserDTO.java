package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.*;

@Data
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserDTO {
    private String email;
    private String username;
    private String password;
}

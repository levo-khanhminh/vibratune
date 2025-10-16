package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private long id;
    private String username;
    private String email;
    private String password;
}

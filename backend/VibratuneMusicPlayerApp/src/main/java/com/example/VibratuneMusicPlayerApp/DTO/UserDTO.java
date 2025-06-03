package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserDTO {
    private long id;
    private String username;
    private String email;
    private String password;
}

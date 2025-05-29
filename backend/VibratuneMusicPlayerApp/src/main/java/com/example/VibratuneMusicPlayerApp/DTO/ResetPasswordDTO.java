package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class ResetPasswordDTO {
    private String email;
    private String newPassword;
    private String resetPasswordVerificationCode;
}

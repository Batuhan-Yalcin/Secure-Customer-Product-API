package com.batuhanyalcin.jwt;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    @NotBlank(message = "Username alanı boş olamaz.")
    private String username;
    @NotBlank(message = "Password Alanı boş olamaz.")
    private String password;
}

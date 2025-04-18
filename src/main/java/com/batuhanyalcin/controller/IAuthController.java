package com.batuhanyalcin.controller;

import com.batuhanyalcin.dto.DtoUser;
import com.batuhanyalcin.jwt.AuthRequest;
import com.batuhanyalcin.jwt.AuthResponse;

public interface IAuthController {
    public DtoUser register (AuthRequest request);
    public AuthResponse authenticate(AuthRequest request);
}

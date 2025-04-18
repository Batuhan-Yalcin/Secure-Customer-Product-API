package com.batuhanyalcin.service;

import com.batuhanyalcin.dto.DtoUser;
import com.batuhanyalcin.jwt.AuthRequest;
import com.batuhanyalcin.jwt.AuthResponse;

public interface IAuthService {
    public DtoUser register (AuthRequest request);
    public AuthResponse authenticate(AuthRequest request);
}

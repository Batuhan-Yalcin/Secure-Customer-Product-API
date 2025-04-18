package com.batuhanyalcin.controller.impl;

import com.batuhanyalcin.controller.IAuthController;
import com.batuhanyalcin.dto.DtoUser;
import com.batuhanyalcin.jwt.AuthRequest;
import com.batuhanyalcin.jwt.AuthResponse;
import com.batuhanyalcin.service.IAuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class AuthControllerİmpl implements IAuthController {
    @Autowired
    private IAuthService authService;

    @PostMapping(path = "/register")
    public DtoUser register(@Valid @RequestBody AuthRequest request) {
        return authService.register(request);
    }

    @PostMapping("/authenticate")
    public AuthResponse authenticate(@Valid @RequestBody AuthRequest request) {
        return authService.authenticate(request);
    }
}

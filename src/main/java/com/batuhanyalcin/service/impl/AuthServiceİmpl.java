package com.batuhanyalcin.service.impl;

import com.batuhanyalcin.dto.DtoUser;
import com.batuhanyalcin.jwt.AuthRequest;
import com.batuhanyalcin.jwt.AuthResponse;
import com.batuhanyalcin.jwt.JwtService;
import com.batuhanyalcin.model.User;
import com.batuhanyalcin.repository.UserRepository;
import com.batuhanyalcin.service.IAuthService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceİmpl implements IAuthService {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtService jwtService;

    @Override
    public DtoUser register(AuthRequest request) {
        User user = new User();
        DtoUser dto = new DtoUser();
        user.setUsername(request.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        User dbUser = userRepository.save(user);
        BeanUtils.copyProperties(dbUser,dto);
        return dto;
    }

    @Override
    public AuthResponse authenticate(AuthRequest request) {
        try {
            UsernamePasswordAuthenticationToken authenticate
             = new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword());
            authenticationProvider.authenticate(authenticate);
            Optional<User> optional = userRepository.findByUsername(request.getUsername());
             String token = jwtService.generateToken(optional.get());
            return new AuthResponse(token);
        } catch (Exception e) {
            System.out.println("Username or password error : " + e.getMessage());
        }
        return null;
    }
}

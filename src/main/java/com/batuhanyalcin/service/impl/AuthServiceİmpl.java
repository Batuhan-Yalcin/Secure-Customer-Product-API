package com.batuhanyalcin.service.impl;

import com.batuhanyalcin.dto.DtoUser;
import com.batuhanyalcin.exception.BadRequestException;
import com.batuhanyalcin.exception.ResourceNotFoundException;
import com.batuhanyalcin.exception.UserAlreadyExistsException;
import com.batuhanyalcin.jwt.AuthRequest;
import com.batuhanyalcin.jwt.AuthResponse;
import com.batuhanyalcin.jwt.JwtService;
import com.batuhanyalcin.model.Role;
import com.batuhanyalcin.model.User;
import com.batuhanyalcin.repository.UserRepository;
import com.batuhanyalcin.service.IAuthService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
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
        try {
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new UserAlreadyExistsException("Bu kullanıcı adı zaten kullanılıyor");
            }

            User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
            user.setRole(Role.USER);

            User savedUser = userRepository.save(user);

            DtoUser dtoUser = new DtoUser();
            BeanUtils.copyProperties(savedUser, dtoUser);
            return dtoUser;
        } catch (Exception e) {
            throw new BadRequestException("Kullanıcı kaydı sırasında bir hata oluştu: " + e.getMessage());
        }
    }

    @Override
    public AuthResponse authenticate(AuthRequest request) {
        try {
            UsernamePasswordAuthenticationToken authenticate =
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
            authenticationProvider.authenticate(authenticate);

            User user = userRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı"));

            String token = jwtService.generateToken(user);
            return new AuthResponse(token);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Geçersiz kullanıcı adı veya şifre");
        } catch (Exception e) {
            throw new BadRequestException("Kimlik doğrulama sırasında bir hata oluştu");
        }
    }
}

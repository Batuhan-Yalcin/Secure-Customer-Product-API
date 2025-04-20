package com.batuhanyalcin.controller.impl;

import com.batuhanyalcin.dto.DtoUser;
import com.batuhanyalcin.exception.ResourceNotFoundException;
import com.batuhanyalcin.model.Role;
import com.batuhanyalcin.model.User;
import com.batuhanyalcin.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PutMapping("/users/{userId}/role")
    public ResponseEntity<DtoUser> updateUserRole(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı: " + userId));

        user.setRole(Role.ADMIN);
        User updatedUser = userRepository.save(user);

        DtoUser dtoUser = new DtoUser();
        BeanUtils.copyProperties(updatedUser, dtoUser);
        return ResponseEntity.ok(dtoUser);
    }
}

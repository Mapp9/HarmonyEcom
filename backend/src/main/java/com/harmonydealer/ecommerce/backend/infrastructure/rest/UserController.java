package com.harmonydealer.ecommerce.backend.infrastructure.rest;

import com.harmonydealer.ecommerce.backend.application.UserService;
import com.harmonydealer.ecommerce.backend.domain.model.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User save(@RequestBody User user){
        return userService.save(user);
    }

    @GetMapping
    public User findById(@PathVariable Integer id){
        return userService.findById(id);
    }
    
}

package com.harmonydealer.ecommerce.backend.infrastructure.rest;


import com.harmonydealer.ecommerce.backend.application.UserService;
import com.harmonydealer.ecommerce.backend.domain.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/users")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class AdminUserController {
    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    public AdminUserController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    public ResponseEntity<User> save(@RequestBody User user){
        log.info("Clave encriptada: {}", passwordEncoder.encode(user.getPassword()));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Integer id, @RequestBody User user) {
        User existingUser = userService.findById(id);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }
        if (!user.getPassword().equals(existingUser.getPassword())){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        user.setId(id);
        User updatedUser = userService.save(user);
        return ResponseEntity.ok(updatedUser);
    }


    @GetMapping
    public ResponseEntity<Iterable<User>> findAll(){
        return ResponseEntity.ok(userService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Integer id){
        return ResponseEntity.ok(userService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable Integer id){
        userService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}

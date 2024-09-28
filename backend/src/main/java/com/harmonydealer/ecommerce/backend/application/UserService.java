package com.harmonydealer.ecommerce.backend.application;

import com.harmonydealer.ecommerce.backend.domain.model.User;
import com.harmonydealer.ecommerce.backend.domain.port.IUserRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserService {
    private final IUserRepository iUserRepository;

    public User save(User user){
        return this.iUserRepository.save(user);
    }
    public Iterable<User> findAll(){
        return this.iUserRepository.findAll();
    }
    public User findById(Integer id){
        return this.iUserRepository.findById(id);
    }
    public User findByEmail(String email){
        return this.iUserRepository.findByEmail(email);
    }
    public void deleteById(Integer id){
        iUserRepository.deleteById(id);
    }
}

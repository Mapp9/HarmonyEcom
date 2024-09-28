package com.harmonydealer.ecommerce.backend.domain.port;

import com.harmonydealer.ecommerce.backend.domain.model.User;

public interface IUserRepository {
    User save(User user);
    Iterable<User> findAll();
    User findByEmail(String email);
    User findById(Integer id);
    void deleteById(Integer id);
}

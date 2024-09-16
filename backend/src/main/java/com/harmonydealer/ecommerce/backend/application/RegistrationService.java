package com.harmonydealer.ecommerce.backend.application;

import com.harmonydealer.ecommerce.backend.domain.model.User;
import com.harmonydealer.ecommerce.backend.domain.port.IUserRepository;

public class RegistrationService {
    private final IUserRepository iUserRepository;

    public RegistrationService(IUserRepository iUserRepository) {
        this.iUserRepository = iUserRepository;
    }

    public User registrer (User user){
        return iUserRepository.save(user);
    }
}

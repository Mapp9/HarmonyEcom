package com.harmonydealer.ecommerce.backend.infrastructure.config;

import com.harmonydealer.ecommerce.backend.application.UserService;
import com.harmonydealer.ecommerce.backend.domain.port.IUserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {

    @Bean
    public UserService userService(IUserRepository iUserRepository){
        return new UserService(iUserRepository);
    }
}

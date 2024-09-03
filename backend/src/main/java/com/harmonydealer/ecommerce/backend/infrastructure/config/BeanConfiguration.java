package com.harmonydealer.ecommerce.backend.infrastructure.config;

import com.harmonydealer.ecommerce.backend.application.CategoryService;
import com.harmonydealer.ecommerce.backend.application.OrderService;
import com.harmonydealer.ecommerce.backend.application.ProductService;
import com.harmonydealer.ecommerce.backend.application.UserService;
import com.harmonydealer.ecommerce.backend.domain.port.ICategoryRepository;
import com.harmonydealer.ecommerce.backend.domain.port.IOrderRepository;
import com.harmonydealer.ecommerce.backend.domain.port.IProductRepository;
import com.harmonydealer.ecommerce.backend.domain.port.IUserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {

    @Bean
    public UserService userService(IUserRepository iUserRepository){
        return new UserService(iUserRepository);
    }

    @Bean
    public CategoryService categoryService(ICategoryRepository iCategoryRepository){
        return new CategoryService(iCategoryRepository);
    }

    @Bean
    public ProductService productService(IProductRepository iProductRepository){
        return new ProductService(iProductRepository);
    }
    @Bean
    public OrderService orderService(IOrderRepository iOrderRepository){
        return new OrderService(iOrderRepository);
    }
}

Código por casos de uso

Registrar un usuario

Backend

* > backend
    * > application
        * - CategoryService.java
        * - ProductService.java
        * - UploadFile.java
        * - OrderService.java
        * - RegistrationService.java
        * - UserService.java
    * > domain
        * > model
            * - Category.java
            * - Order.java
            * - OrderState.java
            * - URLPaypalResponse.java
            * - UserType.java:
                    package com.harmonydealer.ecommerce.backend.domain.model;

                    public enum UserType {
                        ADMIN, USER
                    }
            * - DataPayment.java
            * - OrderProduct.java
            * - Product.java
            * - User.java:
                    package com.harmonydealer.ecommerce.backend.domain.model;

                    import lombok.AllArgsConstructor;
                    import lombok.Data;
                    import lombok.NoArgsConstructor;

                    import java.time.LocalDateTime;

                    @Data
                    @AllArgsConstructor
                    @NoArgsConstructor
                    public class User {
                        private Integer id;
                        private String username;
                        private String firstName;
                        private String lastName;
                        private String email;
                        private String address;
                        private String cellphone;
                        private String password;
                        private UserType userType;
                        private LocalDateTime dateCreated;
                        private LocalDateTime dateUpdated;
                    }
        * > port
            * - ICategoryRepository.java
            * - IOrderRepository.java
            * - IProductRepository.java
            * - IUserRepository.java
    * > infrastructure
        * > adapter
            * - CategoryCrudRepositoryImpl.java
            * - IOrderCrudRepository.java
            * - IUserCrudRepository.java
            * - ProductCrudRepositoryImpl.java
            * - ICategoryCrudRepository.java
            * - IProductCrudRepository.java
            * - OrderCrudRepositoryImpl.java
            * - UserCrudRepositoryImpl.java
        * > config
            * - BeanConfiguration.java
            * - PaypalConfig.java
            * - SecurityConfig.java
        * > dto
            * - JWTClient.java
            * - UserDTO.java
        * > entity
            * - CategoryEntity.java
            * - OrderEntity.java
            * - OrderProductEntity.java
            * - ProductEntity.java
            * - UserEntity.java
        * > jwt
            * - Constants.java
            * - JWTAuthorizationFilter.java
            * - JWTGenerator.java
            * - JWTValidate.java
        * > mapper
            * - CategoryMapper.java
            * - IOrderProductMapper.java
            * - UserMapper.java
            * - IOrderMapper.java
            * - ProductMapper.java
        * > rest
            * - CategoryController.java
            * - LoginController.java
            * - PaypalController.java
            * - RegistrationController.java
            * - HomeController.java
            * - OrderController.java
            * - ProductController.java
            * - UserController.java
        * > service
            * - CustomUserDetailService.java
            * - PaypalService.java
* - BackendApplication.java:
        package com.harmonydealer.ecommerce.backend;

        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;

        @SpringBootApplication
        public class BackendApplication {

        	public static void main(String[] args) {
        		SpringApplication.run(BackendApplication.class, args);
        	}

        }
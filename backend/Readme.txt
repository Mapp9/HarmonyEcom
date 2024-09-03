>application
    * UserService:
        public class UserService {
            private final IUserRepository iUserRepository;

            public UserService(IUserRepository iUserRepository) {
                this.iUserRepository = iUserRepository;
            }

            public User save(User user){
                return this.iUserRepository.save(user);
            }
            public User findById(Integer id){
                return this.iUserRepository.findById(id);
            }
        }
>domain
    >model
        *User:
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
        *UserType:
            public enum UserType {
                ADMIN, USER
            }
    >port
        *IUserRepository:
            public interface IUserRepository {
                User save(User user);
                User findByEmail(String email);
                User findById(Integer id);
            }
>infrastructure
    >adapter
        * IUserCrudRepository:
            public interface IUserCrudRepository extends CrudRepository<UserEntity, Integer> {
                        }
        * UserCrudRepositoryImpl:
            @Repository
                        public class UserCrudRepositoryImpl implements IUserRepository {
                            private final IUserCrudRepository iUserCrudRepository;
                            private final UserMapper userMapper;
                            public UserCrudRepositoryImpl(IUserCrudRepository iUserCrudRepository, UserMapper userMapper) {
                                this.iUserCrudRepository = iUserCrudRepository;
                                this.userMapper = userMapper;
                            }
                            @Override
                            public User save(User user) {
                                return userMapper.toUser(iUserCrudRepository.save(userMapper.toUserEntity(user)));
                            }
                            @Override
                            public User findByEmail(String email) {
                                return null;
                            }
    >config
        * BeanConfiguration:
            @Configuration
            public class BeanConfiguration {
                @Bean
                public UserService userService(IUserRepository iUserRepository){
                    return new UserService(iUserRepository);
                }
            }
    >mapper
        * UserMapper:
            @Mapper(componentModel = "spring")
            public interface UserMapper {
                @Mappings(
                        {
                                @Mapping(source = "id", target = "id"),
                                @Mapping(source = "username", target = "username"),
                                @Mapping(source = "firstName", target = "firstName"),
                                @Mapping(source = "lastName", target = "lastName"),
                                @Mapping(source = "email", target = "email"),
                                @Mapping(source = "address", target = "address"),
                                @Mapping(source = "cellphone", target = "cellphone"),
                                @Mapping(source = "password", target = "password"),
                                @Mapping(source = "userType", target = "userType"),
                                @Mapping(source = "dateCreated", target = "dateCreated"),
                                @Mapping(source = "dateUpdated", target = "dateUpdated")
                        }
                )
                User toUser(UserEntity userEntity);
                Iterable<User> toUsers(Iterable<UserEntity> userEntities);
                @InheritInverseConfiguration
                UserEntity toUserEntity(User user);
            }
    >rest
        * UserController:
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
                @GetMapping("/{id}")
                public User findById(@PathVariable Integer id){
                    return userService.findById(id);
                }
            }
    *UserEntity:
        @Entity
        @Table(name = "users")
        @Data
        @NoArgsConstructor
        public class UserEntity {
            @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
            private Integer id;
            private String username;
            private String firstName;
            private String lastName;
            @Column(unique = true)
            private String email;
            private String address;
            private String cellphone;
            private String password;
            @Enumerated(EnumType.STRING)
            private UserType userType;
            @CreationTimestamp
            private LocalDateTime dateCreated;
            @UpdateTimestamp
            private LocalDateTime dateUpdated;
        }
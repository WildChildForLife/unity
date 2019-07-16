import { UserRepository } from '../repositories';
import { UserProfile, TokenService, UserService } from '@loopback/authentication';
import { Credentials } from '../repositories/user.repository';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
import { User } from "../models/user.model";
export declare class UserController {
    userRepository: UserRepository;
    passwordHasher: PasswordHasher;
    jwtService: TokenService;
    userService: UserService<User, Credentials>;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher, jwtService: TokenService, userService: UserService<User, Credentials>);
    create(user: User): Promise<User>;
    findById(userId: string): Promise<User>;
    printCurrentUser(currentUserProfile: UserProfile): Promise<UserProfile>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
}

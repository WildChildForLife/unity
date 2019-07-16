import { DefaultCrudRepository } from '@loopback/repository';
import { UserDataSource } from "../datasources";
import { User } from "../models/user.model";
export declare type Credentials = {
    email: string;
    password: string;
};
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id> {
    constructor(dataSource: UserDataSource);
}

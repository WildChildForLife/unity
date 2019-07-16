import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';
import {UserDataSource} from "../datasources";
import {User} from "../models/user.model";

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(User, dataSource);
  }
}

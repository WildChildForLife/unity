import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    constructor(data?: Partial<User>);
}

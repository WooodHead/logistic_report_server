import { User as UserModel, Prisma } from '@prisma/client';
import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    index(): Promise<UserModel[]>;
    store(userData: Prisma.UserCreateInput): Promise<UserModel>;
}

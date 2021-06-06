import { Body, Controller, Get, Post } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('users')
    index(): Promise<UserModel[]> {
        return this.userService.users({});
    }

    @Post('users')
    store(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
        // console.log(userData);
        // throw new Error('Lolol!');
        return this.userService.createUser(userData);
    }
}

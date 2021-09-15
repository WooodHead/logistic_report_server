import { Body, Controller, Request, Post, Put, UseGuards } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
// import { Auto as AutoModel, Prisma } from '@prisma/client';
import { AutoService } from '../auto/auto.service';
import { AutoBrandModel } from '../../models/AutoBrand.model';
import { CompanyModel } from '../../models/Company.model';
import { CustomAutoCreateInput, CustomAutoUpdateInput } from '../../models/Auto.model';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserDto } from '../../models/User.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    register(@Body() user: UserDto): Promise<UserModel> {
        return this.userService.createUser(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req): UserModel {
        return req.user;
    }
}

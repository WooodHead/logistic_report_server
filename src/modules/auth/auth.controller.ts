import { Body, Controller, Request, Post, Put, UseGuards } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
// import { Auto as AutoModel, Prisma } from '@prisma/client';
import { AutoService } from '../auto/auto.service';
import { AutoBrandModel } from '../../models/AutoBrand.model';
import { CompanyModel } from '../../models/Company.model';
import { CustomAutoCreateInput, CustomAutoUpdateInput } from '../../models/Auto.model';
import { AuthService } from './services/auth.service';
import { UserService } from '../user/user.service';
import { UserDto } from '../../models/UserDto.model';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService, private authService: AuthService) {}

    @Post('register')
    register(@Body() user: UserDto): Promise<UserModel> {
        return this.userService.createUser(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req): Promise<{ accessToken: string }> {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('refresh')
    async refresh(@Request() req): Promise<{ accessToken: string }> {
        const user: UserModel = await this.userService.user({ id: req.user.id });
        return this.authService.login(user);
    }
}

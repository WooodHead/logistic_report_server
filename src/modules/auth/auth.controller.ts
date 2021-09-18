import { Body, Controller, Request, Post, Put, UseGuards } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import { AuthService } from './services/auth.service';
import { UserService } from '../user/user.service';
import { UserDto } from '../../models/UserDto.model';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService, private authService: AuthService) {}

    @Public()
    @Post('register')
    register(@Body() user: UserDto): Promise<UserModel> {
        return this.userService.createUser(user);
    }

    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req): Promise<{ accessToken: string }> {
        return this.authService.login(req.user);
    }

    @Post('refresh')
    async refresh(@Request() req): Promise<{ accessToken: string }> {
        const user: UserModel = await this.userService.user({ id: req.user.id });
        return this.authService.login(user);
    }
}

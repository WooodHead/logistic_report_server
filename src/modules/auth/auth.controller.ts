import { Body, Controller, Request, Post, Put, UseGuards } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import { AuthService } from './services/auth.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './auth.guard';
import { UserDto } from '../../models/User.model';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService, private authService: AuthService) {}

    @Public()
    @Post('register')
    async register(
        @Body() user: UserDto
    ): Promise<{ user: Partial<UserModel>; accessToken: string }> {
        const createdUser: UserModel = await this.userService.store(user);
        return this.authService.login(createdUser);
    }

    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req): Promise<{ accessToken: string }> {
        return this.authService.login(req.user);
    }

    @Post('refresh')
    async refresh(@Request() req): Promise<{ accessToken: string }> {
        const user: UserModel = await this.userService.findOne({ id: req.user.id });
        return this.authService.login(user);
    }
}

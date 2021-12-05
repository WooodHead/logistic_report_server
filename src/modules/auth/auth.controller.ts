import { Body, Controller, Request, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import { AuthService } from './services/auth.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './auth.guard';
import { NewPasswordDto } from './models/new-password.dto';
import { UserDto } from '../user/models/user.dto';

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

    @Public()
    @Post('new-password')
    @HttpCode(HttpStatus.OK)
    async newPassword(
        // @Req() req: { user: User },
        // @Res({ passthrough: true }) res: Response,
        @Body() newPasswordDto: NewPasswordDto
    ) {
        const user = await this.authService.getUserByToken(newPasswordDto.accessToken);
        await this.userService.update({
            where: { id: user.id },
            data: { password: newPasswordDto.password },
        });
        return this.authService.login(user);
    }

    @Post('refresh')
    async refresh(@Request() req): Promise<{ accessToken: string }> {
        const user: UserModel = await this.userService.findOne({ id: req.user.id });
        return this.authService.login(user);
    }
}

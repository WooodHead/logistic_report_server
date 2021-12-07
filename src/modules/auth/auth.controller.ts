import {
    Body,
    Controller,
    Post,
    UseGuards,
    HttpCode,
    HttpStatus,
    UseInterceptors,
    ClassSerializerInterceptor,
    Req,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './auth.guard';
import { NewPasswordDto } from './models/new-password.dto';
import { UserDto } from '../user/models/user.dto';
import { LoginResponseDto } from './models/login-response.dto';
import { UserModel } from '../user/models/user.model';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly userService: UserService, private authService: AuthService) {}

    @Public()
    @Post('register')
    async register(@Body() user: UserDto): Promise<LoginResponseDto> {
        const createdUser: UserModel = await this.userService.store(user);
        return this.authService.login(createdUser);
    }

    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Req() req: { user: UserModel }): LoginResponseDto {
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
        const user: UserModel = await this.authService.getUserByToken(newPasswordDto.accessToken);
        await this.userService.update({
            where: { id: user.id },
            data: { password: newPasswordDto.password },
        });
        return this.authService.login(user);
    }

    // @Post('refresh')
    // async refresh(@Req() req: { user: UserModel }): Promise<{ accessToken: string }> {
    //     const user: User = await this.userService.findOne({ id: req.user.id });
    //     return this.authService.login(user);
    // }
}

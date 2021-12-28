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
import { SubscriptionPlans, SubscriptionService } from '../liqpay/subscription.service';
import * as moment from 'moment';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private authService: AuthService,
        private subscriptionService: SubscriptionService
    ) {}

    @Public()
    @Post('register')
    async register(@Body() user: UserDto): Promise<LoginResponseDto> {
        const { orderId, ...restUser } = user;
        const createdUser: UserModel = await this.userService.store(restUser);

        // const startDate = moment(Date.now());
        // const unit = 'year';
        // const userId = undefined;
        // const endDate = moment(Date.now()).add(1, unit);
        // await this.subscriptionService.store({
        //     uniqId: '' + 12111231243212,
        //     orderId: '' + 123211244131,
        //     subscriptionStart: startDate.toDate(),
        //     subscriptionEnd: endDate.toDate(),
        //     plan: 'year',
        //     ...(userId && { userId }),
        // });
        // if (orderId) {
        //     await this.subscriptionService.update({
        //         where: { orderId: '1231231231' },
        //         data: { userId: createdUser.id },
        //     });
        // }

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
        await this.userService.changePassword(user.id, newPasswordDto.password);
        return this.authService.login(user);
    }

    // @Post('refresh')
    // async refresh(@Req() req: { user: UserModel }): Promise<{ accessToken: string }> {
    //     const user: User = await this.userService.findOne({ id: req.user.id });
    //     return this.authService.login(user);
    // }
}

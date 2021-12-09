import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    user(@Req() req: { user: UserModel }): Promise<UserModel> {
        return this.userService.findOne({ id: req.user.id });
    }

    @Post()
    store(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
        return this.userService.store(userData);
    }
}

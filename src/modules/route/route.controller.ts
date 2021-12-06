import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Route as RouteModel, Prisma, User } from '@prisma/client';
import { RouteService } from './route.service';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller()
export class RouteController {
    constructor(private readonly routeService: RouteService) {}

    @Get('routes')
    index(@Req() req: { user: User }): Promise<RouteModel[]> {
        return this.routeService.routes({
            where: { userId: req.user.id },
        });
    }

    // @Post('users')
    // store(@Body() userData: Prisma.UserCreateInput): Promise<AutoModel> {
    //     return this.autoService.createUser(userData);
    // }
}

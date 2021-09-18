import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Route as RouteModel, Prisma } from '@prisma/client';
import { RouteService } from './route.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class RouteController {
    constructor(private readonly routeService: RouteService) {}

    @Get('routes')
    index(): Promise<RouteModel[]> {
        return this.routeService.routes({});
    }

    // @Post('users')
    // store(@Body() userData: Prisma.UserCreateInput): Promise<AutoModel> {
    //     return this.autoService.createUser(userData);
    // }
}

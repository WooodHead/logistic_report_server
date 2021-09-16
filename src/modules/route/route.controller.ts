import { Body, Controller, Get, Post } from '@nestjs/common';
import { Route as RouteModel, Prisma } from '@prisma/client';
import { RouteService } from './route.service';

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

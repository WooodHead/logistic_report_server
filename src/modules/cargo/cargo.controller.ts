import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Cargo as CargoModel, Prisma } from '@prisma/client';
import { CargoService } from './cargo.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class CargoController {
    constructor(private readonly cargoService: CargoService) {}

    @Get('cargos')
    index(): Promise<CargoModel[]> {
        return this.cargoService.cargos({});
    }

    // @Post('users')
    // store(@Body() userData: Prisma.UserCreateInput): Promise<AutoModel> {
    //     return this.autoService.createUser(userData);
    // }
}

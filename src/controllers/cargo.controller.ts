import { Body, Controller, Get, Post } from '@nestjs/common';
import { Cargo as CargoModel, Prisma } from '@prisma/client';
import { CargoService } from '../services/cargo.service';

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

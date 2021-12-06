import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Cargo as CargoModel, Prisma, User } from '@prisma/client';
import { CargoService } from './cargo.service';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller()
export class CargoController {
    constructor(private readonly cargoService: CargoService) {}

    @Get('cargos')
    index(@Req() req: { user: User }): Promise<CargoModel[]> {
        return this.cargoService.cargos({
            where: {
                OR: [{ userId: req.user.id }, { isDefault: true }],
            },
        });
    }

    // @Post('users')
    // store(@Body() userData: Prisma.UserCreateInput): Promise<AutoModel> {
    //     return this.autoService.createUser(userData);
    // }
}

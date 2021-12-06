import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AutoBrand as AutoBrandModel, Prisma, User } from '@prisma/client';
import { AutoBrandService } from './autoBrand.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class AutoBrandController {
    constructor(private readonly autoBrandService: AutoBrandService) {}

    @Get('auto-brands')
    index(@Req() req: { user: User }): Promise<AutoBrandModel[]> {
        return this.autoBrandService.autoBrands({
            where: {
                OR: [{ userId: req.user.id }, { isDefault: true }],
            },
        });
    }
}

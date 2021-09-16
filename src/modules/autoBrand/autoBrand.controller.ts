import { Body, Controller, Get, Post } from '@nestjs/common';
import { AutoBrand as AutoBrandModel, Prisma } from '@prisma/client';
import { AutoBrandService } from './autoBrand.service';

@Controller()
export class AutoBrandController {
    constructor(private readonly autoBrandService: AutoBrandService) {}

    @Get('auto-brands')
    index(): Promise<AutoBrandModel[]> {
        return this.autoBrandService.autoBrands({});
    }
}

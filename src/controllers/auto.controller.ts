import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auto as AutoModel, Prisma } from '@prisma/client';
import { AutoService } from '../services/auto.service';
import { CustomAutoCreateInput } from '../models/Auto.model';
import { AutoBrandModel } from '../models/AutoBrand.model';
import { CompanyModel } from '../models/Company.model';

@Controller()
export class AutoController {
    constructor(private readonly autoService: AutoService) {}

    @Get('autos')
    index(): Promise<AutoModel[]> {
        return this.autoService.autos({
            include: {
                company: true,
                autoBrand: true,
            },
        });
    }

    @Post('autos')
    store(@Body() autoData: CustomAutoCreateInput): Promise<AutoModel> {
        const { autoBrand, company, ...restData } = autoData;

        const autoCreateInput: Prisma.AutoCreateInput = {
            ...restData,
            autoBrand: AutoBrandModel.createOrConnect(autoBrand),
            company: CompanyModel.createOrConnect(company),
        };

        return this.autoService.createAuto(autoCreateInput);
    }
}

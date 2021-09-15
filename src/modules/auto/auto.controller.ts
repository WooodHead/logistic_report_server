import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Auto as AutoModel, Prisma } from '@prisma/client';
import { AutoService } from './auto.service';
import { AutoBrandModel } from '../../models/AutoBrand.model';
import { CompanyModel } from '../../models/Company.model';
import { CustomAutoCreateInput, CustomAutoUpdateInput } from '../../models/Auto.model';

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

    @Put('autos')
    async update(@Body() autoData: CustomAutoUpdateInput): Promise<AutoModel> {
        const { autoBrand, company, id, companyId, autoBrandId, ...restData } = autoData;

        const autoUpdateInput: Prisma.AutoUpdateInput = {
            ...restData,
            autoBrand: AutoBrandModel.update(autoBrand),
            company: CompanyModel.update(company),
        };

        await this.autoService.updateAuto({
            where: { id },
            data: autoUpdateInput,
        });

        const params = {
            include: { company: true, autoBrand: true },
        };

        return this.autoService.auto({ id }, params);
    }

    @Post('autos')
    async store(@Body() autoData: CustomAutoCreateInput): Promise<AutoModel> {
        const { autoBrand, company, ...restData } = autoData;

        const autoCreateInput: Prisma.AutoCreateInput = {
            ...restData,
            autoBrand: AutoBrandModel.createOrConnect(autoBrand),
            company: CompanyModel.createOrConnect(company),
        };

        const { id } = await this.autoService.createAuto(autoCreateInput);

        const params = {
            include: {
                company: true,
                autoBrand: true,
            },
        };

        return this.autoService.auto({ id }, params);
    }
}

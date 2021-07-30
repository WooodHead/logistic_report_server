import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { Auto as AutoModel, Prisma } from '@prisma/client';
import { LardiTransService } from '../services/lardiTrans.service';
import { LardiCompany, RawLardiCompanyInterface } from '../models/Company.model';
// import { AutoBrandModel } from '../models/AutoBrand.model';
// import { CompanyModel } from '../models/Company.model';
// import { CustomAutoCreateInput } from '../validation/CustomAutoCreateInput';

@Controller()
export class LardiTransController {
    constructor(private readonly lardiTransService: LardiTransService) {}

    @Get('lardi-trans/search')
    async search(@Query('code') code: string): Promise<LardiCompany> {
        const rawLardiCompanies: RawLardiCompanyInterface[] = await this.lardiTransService.search(code);
        const lardiCompany = rawLardiCompanies.find((company) => company.firmCode === code);
        if (!lardiCompany) {
            return {} as LardiCompany;
        }
        const { name, firmCode, rating, refId } = lardiCompany;
        return new LardiCompany(firmCode, name, rating, refId);
    }
    //
    // @Post('autos')
    // async store(@Body() autoData: CustomAutoCreateInput): Promise<AutoModel> {
    //     const { autoBrand, company, ...restData } = autoData;
    //
    //     const autoCreateInput: Prisma.AutoCreateInput = {
    //         ...restData,
    //         autoBrand: AutoBrandModel.createOrConnect(autoBrand),
    //         company: CompanyModel.createOrConnect(company),
    //     };
    //
    //     const { id } = await this.autoService.createAuto(autoCreateInput);
    //
    //     const params = {
    //         include: {
    //             company: true,
    //             autoBrand: true,
    //         },
    //     };
    //
    //     return this.autoService.auto({ id }, params);
    // }
}

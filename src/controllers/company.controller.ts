import { Body, Controller, DefaultValuePipe, Get, ParseBoolPipe, Query } from '@nestjs/common';
import { Company as CompanyModel, Prisma } from '@prisma/client';
import { CompanyService } from '../services/company.service';
import { CustomAutoCreateInput } from '../models/Auto.model';

@Controller()
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Get('companies')
    index(
        @Query('cargoOwner', new DefaultValuePipe(false), ParseBoolPipe) cargoOwner: boolean
    ): Promise<CompanyModel[]> {
        return this.companyService.companies({
            where: {
                isCargoOwner: cargoOwner,
            },
        });
    }

    // @Post('users')
    // store(@Body() userData: Prisma.UserCreateInput): Promise<AutoModel> {
    //     return this.autoService.createUser(userData);
    // }
}

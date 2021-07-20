import { Body, Controller, Get, Post } from '@nestjs/common';
import { Company as CompanyModel, Prisma } from '@prisma/client';
import { CompanyService } from '../services/company.service';

@Controller()
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Get('companies')
    index(): Promise<CompanyModel[]> {
        return this.companyService.companies({});
    }

    // @Post('users')
    // store(@Body() userData: Prisma.UserCreateInput): Promise<AutoModel> {
    //     return this.autoService.createUser(userData);
    // }
}

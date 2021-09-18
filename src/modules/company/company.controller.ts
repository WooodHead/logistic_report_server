import {
    Controller,
    DefaultValuePipe,
    Get,
    ParseBoolPipe,
    Query,
} from '@nestjs/common';
import { Company as CompanyModel } from '@prisma/client';
import { CompanyService } from './company.service';

// @UseGuards(AuthGuard('jwt'))
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

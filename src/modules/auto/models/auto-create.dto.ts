import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { CustomAutoBrandCreateInput } from '../../../models/AutoBrand.model';
import { CompanyCreateDto } from '../../company/models/company-create.dto';

type AutoUncheckedCreateInput = Omit<Prisma.AutoUncheckedCreateInput, 'userId'>;

export class AutoCreateDto implements AutoUncheckedCreateInput {
    @IsNotEmpty()
    autoNum: string;
    trailNum?: string;
    driver?: string | null;
    contact?: string | null;
    license?: string | null;
    notes?: string | null;

    // @ValidateNested({ each: true })
    // @Type(() => CustomCompanyCreateInput)
    company?: CompanyCreateDto | null;

    @ValidateNested({ each: true })
    @Type(() => CustomAutoBrandCreateInput)
    autoBrand?: CustomAutoBrandCreateInput | null;
}

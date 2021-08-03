import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { CustomCompanyCreateInput } from './Company.model';
import { CustomAutoBrandCreateInput } from './AutoBrand.model';

export class CustomAutoCreateInput implements Prisma.AutoUncheckedCreateInput {
    @IsNotEmpty()
    autoNum: string;
    trailNum?: string;
    driver?: string | null;
    contact?: string | null;
    license?: string | null;
    notes?: string | null;

    // @ValidateNested({ each: true })
    // @Type(() => CustomCompanyCreateInput)
    company?: CustomCompanyCreateInput | null;

    @ValidateNested({ each: true })
    @Type(() => CustomAutoBrandCreateInput)
    autoBrand?: CustomAutoBrandCreateInput | null;
}

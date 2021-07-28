import { IsNotEmpty } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CustomAutoCreateInput {
    @IsNotEmpty()
    autoNum: string;
    trailNum: string;
    driver?: string | null;
    contact?: string | null;
    license?: string | null;
    notes?: string | null;
    company?: Prisma.CompanyUncheckedCreateInput | null;
    autoBrand?: Prisma.AutoBrandUncheckedCreateInput | null;
}

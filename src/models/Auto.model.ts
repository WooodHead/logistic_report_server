import { Prisma } from '@prisma/client';

export interface CustomAutoCreateInput {
    trailNum: string;
    autoNum: string;
    driver?: string | null;
    contact?: string | null;
    license?: string | null;
    notes?: string | null;
    company?: Prisma.CompanyUncheckedCreateInput | null;
    autoBrand?: Prisma.AutoBrandUncheckedCreateInput | null;
}

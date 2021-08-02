import { IsNotEmpty } from 'class-validator';
import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';

export class CustomAutoCreateInput {
    @IsNotEmpty()
    autoNum: string;
    trailNum?: string;
    driver?: string | null;
    contact?: string | null;
    license?: string | null;
    notes?: string | null;
    company?: Prisma.CompanyUncheckedCreateInput | null;
    autoBrand?: Prisma.AutoBrandUncheckedCreateInput | null;
}

export class CustomReportCreateInput {
    @IsNotEmpty()
    date: Date | string;
    autoNum?: string | null;
    driver?: string | null;
    @Transform(({ value }) => {
        return value ? parseInt(value, 10) : value;
    })
    rate?: number | null;
    @IsNotEmpty()
    route: Prisma.RouteUncheckedCreateInput;
    @IsNotEmpty()
    cargo: Prisma.CargoUncheckedCreateInput;
    company?: Prisma.CompanyUncheckedCreateInput | null;
}

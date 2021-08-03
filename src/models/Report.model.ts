import { IsNotEmpty } from 'class-validator';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';

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

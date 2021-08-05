import { IsNotEmpty } from 'class-validator';
import { Prisma, Report } from '@prisma/client';
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
    autoOwner?: Prisma.CompanyUncheckedCreateInput | null;
    cargoOwner?: Prisma.CompanyUncheckedCreateInput | null;
}

export class ReportResponse {
    id: number;
    date: string;
    routeId: number;
    cargoId: number;
    autoOwnerId: number | null;
    cargoOwnerId: number | null;
    autoNum: string | null;
    driver: string | null;
    rate: number | null;
}

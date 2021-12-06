import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { CompanyUncheckedCreateInput } from '../../company/models/company-create.dto';
import { RouteUncheckedCreateInput } from '../../route/models/route.dto';
import { CargoUncheckedCreateInput } from '../../cargo/models/cargo.dto';

export class ReportDto {
    @IsNotEmpty()
    date: Date | string;
    autoNum?: string | null;
    driver?: string | null;
    @Transform(({ value }) => {
        return value ? parseInt(value, 10) : value;
    })
    rate?: number | null;
    @IsNotEmpty()
    route: RouteUncheckedCreateInput;
    @IsNotEmpty()
    cargo: CargoUncheckedCreateInput;
    autoOwner?: CompanyUncheckedCreateInput | null;
    cargoOwner?: CompanyUncheckedCreateInput | null;
}

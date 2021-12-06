import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export type CompanyUncheckedCreateInput = Omit<Prisma.CompanyUncheckedCreateInput, 'userId'>;

export class CompanyCreateDto implements CompanyUncheckedCreateInput {
    @IsNotEmpty()
    name?: string;
    email?: string;
    code?: string;
}

import { Prisma } from '@prisma/client';
type CompanyUncheckedCreateInput = Omit<Prisma.CompanyUncheckedCreateInput, 'userId'>;

export class CompanyCreateDto implements CompanyUncheckedCreateInput {
    name?: string;
    email?: string;
    code?: string;
}

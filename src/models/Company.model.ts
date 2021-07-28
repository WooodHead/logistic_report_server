import { Prisma } from '@prisma/client';

export class CompanyModel {
    static createOrConnect(
        company: Prisma.CompanyUncheckedCreateInput
    ): Prisma.CompanyCreateNestedOneWithoutAutosInput {
        if (!company) {
            return {};
        }

        return {
            connectOrCreate: {
                create: company,
                where: { id: company.id || 0 },
            },
        };
    }
}

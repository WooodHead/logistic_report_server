import { Prisma } from '@prisma/client';

export class CompanyModel {
    static update(
        company: Prisma.CompanyUncheckedCreateInput
    ): Prisma.CompanyUpdateOneWithoutAutosInput {
        if (!company) {
            return;
        }

        return {
            update: company,
        };
    }

    static connect(company: Prisma.CompanyUncheckedCreateInput) {
        if (!company) {
            return {};
        }

        return {
            connect: { id: company.id },
        };
    }

    static createOrConnect(
        company: Prisma.CompanyUncheckedCreateInput
    ): Prisma.CompanyCreateNestedOneWithoutAutosInput {
        if (!company) {
            return;
        }

        return {
            connectOrCreate: {
                create: company,
                where: { id: company.id || 0 },
            },
        };
    }

    // static connectAutoOwner(
    //     company: Prisma.CompanyUncheckedCreateInput
    // ): Prisma.CompanyCreateNestedOneWithoutReportForAutoOwnerInput {
    //     return this.connectCompany(company);
    // }

    // static createOrConnectCargoOwner(
    //     company: Prisma.CompanyUncheckedCreateInput
    // ): Prisma.CompanyCreateNestedOneWithoutReportForCargoOwnerInput {
    //     if (!company) {
    //         return;
    //     }
    //
    //     return {
    //         connectOrCreate: {
    //             create: company,
    //             where: { id: company.id || 0 },
    //         },
    //     };
    // }
}

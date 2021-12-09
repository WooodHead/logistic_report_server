import { Prisma } from '@prisma/client';
import { CompanyUncheckedCreateInput } from './company-create.dto';

export class CompanyModel {
    static update(
        company: CompanyUncheckedCreateInput,
        userId: number
    ): Prisma.CompanyUpdateOneWithoutAutosInput {
        if (!company) {
            return;
        }

        return {
            update: { ...company, userId },
        };
    }

    static connect(
        company: CompanyUncheckedCreateInput
    ): Prisma.CompanyCreateNestedOneWithoutAutosInput {
        if (!company) {
            return {};
        }

        return {
            connect: { id: company.id },
        };
    }

    static createOrConnect(
        company: CompanyUncheckedCreateInput,
        userId: number
    ): Prisma.CompanyCreateNestedOneWithoutAutosInput {
        if (!company) {
            return;
        }

        return {
            connectOrCreate: {
                create: { ...company, userId },
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

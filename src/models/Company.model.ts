import { Prisma } from '@prisma/client';
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class CustomCompanyCreateInput implements Prisma.CompanyUncheckedCreateInput {
    name?: string;
    email?: string;
    code?: string;
}

export class CompanyModel {
    static update(company: Prisma.CompanyUncheckedCreateInput): Prisma.CompanyUpdateOneWithoutAutosInput {
        if (!company) {
            return;
        }

        return {
            update: company,
        };
    }

    static connectCompany(company: Prisma.CompanyUncheckedCreateInput) {
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

export class LardiCompany implements LardiCompanyInterface {
    code: string;
    name: string;
    refId: number;
    rating: {
        positiveCommentCount: number;
        negativeCommentCount: number;
    };

    constructor(code, name, rating, refId) {
        this.code = code;
        this.name = name;
        this.rating = {
            positiveCommentCount: rating.positiveCommentCount,
            negativeCommentCount: rating.negativeCommentCount,
        };
        this.refId = refId;
    }
}

export interface RawLardiCompanyInterface {
    name: string;
    firmCode: string;
    refId: number;
    rating: {
        positiveCommentCount: number;
        negativeCommentCount: number;
    };
}

export interface LardiCompanyInterface {
    name: string;
    code: string;
    refId: number;
    rating: {
        positiveCommentCount: number;
        negativeCommentCount: number;
    };
}

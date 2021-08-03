import { Prisma } from '@prisma/client';
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class CustomCompanyCreateInput implements Prisma.CompanyUncheckedCreateInput {
    name?: string;
    email?: string;
    code?: string;
}

export class CompanyModel {
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

    static connect(company: Prisma.CompanyUncheckedCreateInput): Prisma.CompanyCreateNestedOneWithoutReportInput {
        if (!company) {
            return {};
        }

        return {
            connect: { id: company.id },
        };
    }
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

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Company, Prisma } from '@prisma/client';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) {}
    //
    // async auto(
    //     userWhereUniqueInput: Prisma.UserWhereUniqueInput
    // ): Promise<Auto | null> {
    //     return this.prisma.auto.findUnique({
    //         where: userWhereUniqueInput,
    //     });
    // }

    async companies(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CompanyWhereUniqueInput;
        where?: Prisma.CompanyWhereInput;
        orderBy?: Prisma.CompanyOrderByInput;
        include?: Prisma.CompanyInclude;
    }): Promise<Company[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.company.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
    }

    // async createAuto(data: Prisma.AutoCreateInput): Promise<Auto> {
    //     return this.prisma.auto.create({
    //         data,
    //     });
    // }
    //
    // async updateAuto(params: { where: Prisma.AutoWhereUniqueInput; data: Prisma.AutoUpdateInput }): Promise<Auto> {
    //     const { where, data } = params;
    //     return this.prisma.auto.update({
    //         data,
    //         where,
    //     });
    // }
    //
    // async deleteAuto(where: Prisma.UserWhereUniqueInput): Promise<Auto> {
    //     return this.prisma.auto.delete({
    //         where,
    //     });
    // }
}

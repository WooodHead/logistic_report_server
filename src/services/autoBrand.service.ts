import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AutoBrand, Prisma } from '@prisma/client';

@Injectable()
export class AutoBrandService {
    constructor(private prisma: PrismaService) {}
    //
    // async auto(
    //     userWhereUniqueInput: Prisma.UserWhereUniqueInput
    // ): Promise<Auto.model.ts | null> {
    //     return this.prisma.auto.findUnique({
    //         where: userWhereUniqueInput,
    //     });
    // }

    async autoBrands(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.AutoBrandWhereUniqueInput;
        where?: Prisma.AutoBrandWhereInput;
        orderBy?: Prisma.AutoBrandOrderByInput;
        include?: Prisma.AutoBrandInclude;
    }): Promise<AutoBrand[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.autoBrand.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
    }

    // async createAuto(data: Prisma.AutoCreateInput): Promise<Auto.model.ts> {
    //     return this.prisma.auto.create({
    //         data,
    //     });
    // }
    //
    // async updateAuto(params: { where: Prisma.AutoWhereUniqueInput; data: Prisma.AutoUpdateInput }): Promise<Auto.model.ts> {
    //     const { where, data } = params;
    //     return this.prisma.auto.update({
    //         data,
    //         where,
    //     });
    // }
    //
    // async deleteAuto(where: Prisma.UserWhereUniqueInput): Promise<Auto.model.ts> {
    //     return this.prisma.auto.delete({
    //         where,
    //     });
    // }
}

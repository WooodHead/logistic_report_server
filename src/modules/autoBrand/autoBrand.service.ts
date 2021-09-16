import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { AutoBrand, Prisma } from '@prisma/client';

@Injectable()
export class AutoBrandService {
    constructor(private prisma: PrismaService) {}
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
}

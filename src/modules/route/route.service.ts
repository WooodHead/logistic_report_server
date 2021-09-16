import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { Route, Prisma } from '@prisma/client';

@Injectable()
export class RouteService {
    constructor(private prisma: PrismaService) {}
    //
    // async auto(
    //     userWhereUniqueInput: Prisma.UserWhereUniqueInput
    // ): Promise<Auto.model.ts | null> {
    //     return this.prisma.auto.findUnique({
    //         where: userWhereUniqueInput,
    //     });
    // }

    async routes(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.RouteWhereUniqueInput;
        where?: Prisma.RouteWhereInput;
        orderBy?: Prisma.RouteOrderByInput;
    }): Promise<Route[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.route.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async findOrCreateRoute(data: Prisma.RouteUncheckedCreateInput): Promise<Route> {
        return this.prisma.route.upsert({
            where: { id: data.id || 0 },
            update: {},
            create: data,
        });
    }

    // async createRoute(data: Prisma.RouteCreateInput): Promise<Route> {
    //     return this.prisma.route.create({
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

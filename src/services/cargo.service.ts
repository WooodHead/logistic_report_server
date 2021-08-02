import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Cargo, Prisma } from '@prisma/client';

@Injectable()
export class CargoService {
    constructor(private prisma: PrismaService) {}
    //
    // async auto(
    //     userWhereUniqueInput: Prisma.UserWhereUniqueInput
    // ): Promise<Auto.model.ts | null> {
    //     return this.prisma.auto.findUnique({
    //         where: userWhereUniqueInput,
    //     });
    // }

    async cargos(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CargoWhereUniqueInput;
        where?: Prisma.CargoWhereInput;
        orderBy?: Prisma.CargoOrderByInput;
    }): Promise<Cargo[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.cargo.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
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

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { Report, Prisma } from '@prisma/client';

@Injectable()
export class ReportService {
    constructor(private prisma: PrismaService) {}

    async report(
        reportWhereUniqueInput: Prisma.ReportWhereUniqueInput,
        params: {
            include?: Prisma.ReportInclude;
        } = {}
    ): Promise<Report | null> {
        const { include } = params;
        return this.prisma.report.findUnique({
            where: reportWhereUniqueInput,
            include,
        });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ReportWhereUniqueInput;
        where?: Prisma.ReportWhereInput;
        orderBy?: Prisma.ReportOrderByWithRelationInput[];
        include?: Prisma.ReportInclude;
    }): Promise<Report[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.report.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
    }

    async reportsGroupBy(
        by = [],
        params: {
            skip?: number;
            take?: number;
            where?: Prisma.ReportWhereInput;
            orderBy?: Prisma.ReportOrderByWithRelationInput[];
        }
    ) {
        const { skip, take, where, orderBy } = params;
        return this.prisma.report.groupBy({
            by,
            skip,
            take,
            where,
            orderBy,
        });
    }

    async rawQuery(query: string): Promise<any[]> {
        return this.prisma.$queryRawUnsafe(query);
    }

    async createReports(data: Prisma.ReportCreateInput[]): Promise<Report[]> {
        const butchOfPromises = data.map((reportData: Prisma.ReportCreateInput) => {
            return this.prisma.report.create({ data: reportData });
        });

        return Promise.all(butchOfPromises);
    }
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

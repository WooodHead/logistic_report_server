import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
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

    async reports(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ReportWhereUniqueInput;
        where?: Prisma.ReportWhereInput;
        orderBy?: Prisma.ReportOrderByInput[];
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
import { Prisma } from '@prisma/client';

export class RouteModel {
    static createOrConnect(
        route: Prisma.RouteUncheckedCreateInput
    ): Prisma.RouteCreateNestedOneWithoutReportInput {
        if (!route) {
            return {};
        }

        return {
            connectOrCreate: {
                create: route,
                where: { id: route.id || 0 },
            },
        };
    }

    static connect(
        route: Prisma.RouteUncheckedCreateInput
    ): Prisma.RouteCreateNestedOneWithoutReportInput {
        if (!route) {
            return {};
        }

        return {
            connect: { id: route.id },
        };
    }
}

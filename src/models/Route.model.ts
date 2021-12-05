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
}

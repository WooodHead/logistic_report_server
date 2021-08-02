import { Prisma } from '@prisma/client';

export class CargoModel {
    static createOrConnect(cargo: Prisma.CargoUncheckedCreateInput): Prisma.CargoCreateNestedOneWithoutReportInput {
        if (!cargo) {
            return {};
        }

        return {
            connectOrCreate: {
                create: cargo,
                where: { id: cargo.id || 0 },
            },
        };
    }
}

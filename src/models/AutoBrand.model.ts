import { Prisma } from '@prisma/client';

export class AutoBrandModel {
    static createOrConnect(
        autoBrand: Prisma.AutoBrandUncheckedCreateInput
    ): Prisma.AutoBrandCreateNestedOneWithoutAutosInput {
        if (!autoBrand) {
            return {};
        }

        return {
            connectOrCreate: {
                create: autoBrand,
                where: { id: autoBrand.id || 0 },
            },
        };
    }
}

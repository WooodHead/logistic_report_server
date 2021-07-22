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
                create: { name: autoBrand.name },
                where: { id: autoBrand.id },
            },
        };
    }
}

import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';
import { AutoBrandUncheckedCreateInput } from './auto-brand.dto';

export class AutoBrandModel {
    static update(
        autoBrand: Prisma.AutoBrandUncheckedCreateInput
    ): Prisma.AutoBrandUpdateOneWithoutAutosInput {
        if (!autoBrand) {
            return;
        }

        return {
            update: autoBrand,
        };
    }

    static createOrConnect(
        autoBrand: AutoBrandUncheckedCreateInput,
        userId: number
    ): Prisma.AutoBrandCreateNestedOneWithoutAutosInput {
        if (!autoBrand) {
            return;
        }

        return {
            connectOrCreate: {
                create: { ...autoBrand, userId },
                where: { id: autoBrand.id || 0 },
            },
        };
    }
}

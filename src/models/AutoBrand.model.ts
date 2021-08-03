import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CustomAutoBrandCreateInput implements Prisma.AutoBrandUncheckedCreateInput {
    @IsNotEmpty()
    name: string;
}

export class AutoBrandModel {
    static createOrConnect(
        autoBrand: Prisma.AutoBrandUncheckedCreateInput
    ): Prisma.AutoBrandCreateNestedOneWithoutAutosInput {
        if (!autoBrand) {
            return;
        }

        return {
            connectOrCreate: {
                create: autoBrand,
                where: { id: autoBrand.id || 0 },
            },
        };
    }
}

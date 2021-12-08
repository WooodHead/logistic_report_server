import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export type AutoBrandUncheckedCreateInput = Omit<Prisma.AutoBrandUncheckedCreateInput, 'userId'>;

export class AutoBrandDto implements AutoBrandUncheckedCreateInput {
    @IsNotEmpty()
    name: string;
}

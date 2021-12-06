import { Prisma } from '@prisma/client';

export type CargoUncheckedCreateInput = Omit<Prisma.CargoUncheckedCreateInput, 'userId'>;

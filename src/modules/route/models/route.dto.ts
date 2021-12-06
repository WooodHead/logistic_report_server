import { Prisma } from '@prisma/client';

export type RouteUncheckedCreateInput = Omit<Prisma.RouteUncheckedCreateInput, 'userId'>;

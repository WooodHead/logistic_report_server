import { Auto as AutoModel, Prisma } from '@prisma/client';

export class AutosResponseDto {
    autos: AutoModel[];

    total?: number;

    warning?: string;
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auto as AutoModel, Prisma } from '@prisma/client';
import { AutoService } from '../services/auto.service';

@Controller()
export class AutoController {
    constructor(private readonly autoService: AutoService) {}

    @Get('autos')
    index(): Promise<AutoModel[]> {
        return this.autoService.autos({
            include: {
                company: true,
                autoBrand: true,
            },
        });
    }

    @Post('autos')
    store(@Body() autoData: Prisma.AutoCreateInput): Promise<AutoModel> {
        return this.autoService.createAuto(autoData);
    }
}

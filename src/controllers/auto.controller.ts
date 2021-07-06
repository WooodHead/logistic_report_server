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

    // @Post('users')
    // store(@Body() userData: Prisma.UserCreateInput): Promise<AutoModel> {
    //     return this.autoService.createUser(userData);
    // }
}

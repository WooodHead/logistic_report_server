import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { Auto as AutoModel, Prisma, User } from '@prisma/client';
import { AutoService } from './auto.service';
import { AutoBrandModel } from '../autoBrand/models/auto-brand.model';
import { CompanyModel } from '../company/models/company.model';
import { AutoCreateDto } from './models/auto-create.dto';
import { AutoUpdateDto } from './models/auto-update.dto';
import { UserModel } from '../user/models/user.model';
import { AutoDeleteDto } from './models/auto-delete.dto';

// @UseGuards(AuthGuard('jwt'))
@Controller('autos')
export class AutoController {
    constructor(private readonly autoService: AutoService) {}

    @Get()
    index(@Req() req: { user: User }): Promise<AutoModel[]> {
        return this.autoService.findAll({
            where: { userId: req.user.id },
            include: {
                company: true,
                autoBrand: true,
            },
        });
    }

    @Put()
    async update(@Body() autoData: AutoUpdateDto, @Req() req: { user: User }): Promise<AutoModel> {
        const { autoBrand, company, id, companyId, autoBrandId, userId, ...restData } = autoData;

        const autoUpdateInput: Prisma.AutoUpdateInput = {
            ...restData,
            autoBrand: AutoBrandModel.update(autoBrand),
            company: CompanyModel.update({ ...company, userId: req.user.id }),
        };

        await this.autoService.updateAuto({
            where: { id },
            data: autoUpdateInput,
        });

        const params = {
            include: { company: true, autoBrand: true },
        };

        return this.autoService.auto({ id }, params);
    }

    @Post()
    async store(
        @Body() autoData: AutoCreateDto,
        @Req() req: { user: UserModel }
    ): Promise<AutoModel> {
        // Check subscription

        const { autoBrand, company, ...restData } = autoData;

        const autoCreateInput: Prisma.AutoCreateInput = {
            ...restData,
            autoBrand: AutoBrandModel.createOrConnect(autoBrand, req.user.id),
            company: CompanyModel.createOrConnect(company, req.user.id),
            user: UserModel.connect(req.user),
        };

        const { id } = await this.autoService.createAuto(autoCreateInput);

        const params = {
            include: {
                company: true,
                autoBrand: true,
            },
        };

        return this.autoService.auto({ id }, params);
    }

    @Delete()
    bulkDelete(
        @Body() autoDeleteDto: AutoDeleteDto,
        @Req() req: { user: UserModel }
    ): Promise<Record<string, never>> {
        return this.autoService.bulkRemove(autoDeleteDto.autoIds, req.user.id);
    }
}

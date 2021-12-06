import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Auto as AutoModel, Prisma, User } from '@prisma/client';
import { AutoService } from './auto.service';
import { AutoBrandModel } from '../../models/AutoBrand.model';
import { CompanyModel } from '../company/models/company.model';
import { AutoCreateDto } from './models/auto-create.dto';
import { AutoUpdateDto } from './models/auto-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from '../user/models/user.model';

// @UseGuards(AuthGuard('jwt'))
@Controller()
export class AutoController {
    constructor(private readonly autoService: AutoService) {}

    @Get('autos')
    index(@Req() req: { user: User }): Promise<AutoModel[]> {
        return this.autoService.findAll({
            where: { userId: req.user.id },
            include: {
                company: true,
                autoBrand: true,
            },
        });
    }

    @Put('autos')
    async update(@Body() autoData: AutoUpdateDto, @Req() req: { user: User }): Promise<AutoModel> {
        const { autoBrand, company, id, companyId, autoBrandId, ...restData } = autoData;

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

    @Post('autos')
    async store(@Body() autoData: AutoCreateDto, @Req() req: { user: User }): Promise<AutoModel> {
        const { autoBrand, company, ...restData } = autoData;

        const autoCreateInput: Prisma.AutoCreateInput = {
            ...restData,
            autoBrand: AutoBrandModel.createOrConnect(autoBrand),
            company: CompanyModel.createOrConnect({ ...company, userId: req.user.id }),
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
}

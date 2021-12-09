import { Body, Controller, Delete, ForbiddenException, Get, Post, Put, Req } from '@nestjs/common';
import { Auto as AutoModel, Prisma, User } from '@prisma/client';
import { AutoService } from './auto.service';
import { AutoBrandModel } from '../autoBrand/models/auto-brand.model';
import { CompanyModel } from '../company/models/company.model';
import { AutoCreateDto } from './models/auto-create.dto';
import { AutoUpdateDto } from './models/auto-update.dto';
import { UserModel } from '../user/models/user.model';
import { AutoDeleteDto } from './models/auto-delete.dto';
import { ConfigService } from '@nestjs/config';
import { AutosResponseDto } from './models/autos-response.dto';

// @UseGuards(AuthGuard('jwt'))
@Controller('autos')
export class AutoController {
    constructor(
        private readonly autoService: AutoService,
        private readonly configService: ConfigService
    ) {}

    @Get()
    async index(@Req() req: { user: UserModel }): Promise<AutosResponseDto> {
        // Check subscription
        let userAutosCount;
        let warning;
        let maxAutos;
        if (!req.user.isPro) {
            userAutosCount = await this.autoService.countUserAutos(req.user.id);
            maxAutos = parseInt(this.configService.get('MAX_AUTOS'), 10);
            if (userAutosCount > maxAutos) {
                warning = `Showing only last ${maxAutos} autos. For show all autos, buy subscription!`;
            }
        }

        const autos = await this.autoService.findAll({
            where: { userId: req.user.id },
            include: {
                company: true,
                autoBrand: true,
            },
            orderBy: { id: Prisma.SortOrder.desc },
            ...(!req.user.isPro && maxAutos && { take: maxAutos }),
        });

        return { autos, warning };
    }

    @Put()
    async update(@Body() autoData: AutoUpdateDto, @Req() req: { user: User }): Promise<AutoModel> {
        const { autoBrand, company, id, companyId, autoBrandId, userId, ...restData } = autoData;

        const autoUpdateInput: Prisma.AutoUpdateInput = {
            ...restData,
            autoBrand: AutoBrandModel.update(autoBrand),
            company: CompanyModel.update(company, req.user.id),
        };

        await this.autoService.updateAuto({
            where: { id },
            data: autoUpdateInput,
        });

        const params = {
            include: { company: true, autoBrand: true },
        };

        return this.autoService.findOne({ id }, params);
    }

    @Post()
    async store(
        @Body() autoData: AutoCreateDto,
        @Req() req: { user: UserModel }
    ): Promise<AutoModel> {
        // Check subscription
        if (!req.user.isPro) {
            const userAutosCount = await this.autoService.countUserAutos(req.user.id);
            const maxAutos = this.configService.get('MAX_AUTOS');
            if (userAutosCount >= maxAutos) {
                throw new ForbiddenException(
                    `Sorry, with free plan you can store only ${maxAutos} autos.` +
                        ' Buy subscription for add unlimited amount of autos'
                ); // ToDo i18n
            }
        }

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

        return this.autoService.findOne({ id }, params);
    }

    @Delete()
    bulkDelete(
        @Body() autoDeleteDto: AutoDeleteDto,
        @Req() req: { user: UserModel }
    ): Promise<Record<string, never>> {
        return this.autoService.bulkRemove(autoDeleteDto.autoIds, req.user.id);
    }
}

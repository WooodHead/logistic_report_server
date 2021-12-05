import { Injectable } from '@nestjs/common';
import { RawLardiCompanyInterface } from '../models/Company.model';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
// import { PrismaService } from './prisma.service';
// import { Auto, Prisma, User } from '@prisma/client';

@Injectable()
export class LardiTransService {
    constructor(private httpService: HttpService) {}

    search(code: string): Promise<RawLardiCompanyInterface[]> {
        const options: AxiosRequestConfig = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: process.env.LARDI_TOKEN,
            },
        };
        return this.httpService
            .get(`https://api.lardi-trans.com/v2/users/search?language=en&query="${code}"`, options)
            .pipe(map((axiosResponse: AxiosResponse) => axiosResponse.data))
            .toPromise();
    }

    // async autos(params: {
    //     skip?: number;
    //     take?: number;
    //     cursor?: Prisma.AutoWhereUniqueInput;
    //     where?: Prisma.AutoWhereInput;
    //     orderBy?: Prisma.AutoOrderByWithRelationInput;
    //     include?: Prisma.AutoInclude;
    // }): Promise<Auto[]> {
    //     const { skip, take, cursor, where, orderBy, include } = params;
    //     return this.prisma.auto.findMany({
    //         skip,
    //         take,
    //         cursor,
    //         where,
    //         orderBy,
    //         include,
    //     });
    // }
    //
    // async createAuto(data: Prisma.AutoCreateInput): Promise<Auto> {
    //     return this.prisma.auto.create({
    //         data,
    //     });
    // }
    //
    // async updateAuto(params: { where: Prisma.AutoWhereUniqueInput; data: Prisma.AutoUpdateInput }): Promise<Auto.model.ts> {
    //     const { where, data } = params;
    //     return this.prisma.auto.update({
    //         data,
    //         where,
    //     });
    // }
    //
    // async deleteAuto(where: Prisma.UserWhereUniqueInput): Promise<Auto.model.ts> {
    //     return this.prisma.auto.delete({
    //         where,
    //     });
    // }
}

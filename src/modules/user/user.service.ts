import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { User as UserEntity, Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findOne(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
        userInclude?: Prisma.UserInclude,
        userSelect?: Prisma.UserSelect
    ): Promise<UserModel | null> {
        const args: Prisma.UserFindUniqueArgs = {
            where: userWhereUniqueInput,
            include: {
                ...userInclude,
                subscriptions: true,
            },
            select: userSelect,
        };
        const userEntity = await this.prisma.user.findUnique(args);
        return userEntity ? plainToClass(UserModel, userEntity) : null;
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<UserModel[]> {
        const { skip, take, cursor, where, orderBy } = params;
        const usersEntities = await this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
        return plainToClass(UserModel, usersEntities);
    }

    async store(data: Prisma.UserCreateInput): Promise<UserModel | null> {
        const userEntity = await this.prisma.user.create({ data });
        return userEntity ? plainToClass(UserModel, userEntity) : null;
    }

    async update(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<UserModel> {
        const { where, data } = params;
        const userEntity = await this.prisma.user.update({ data, where });
        // ToDo checkUpdresult
        return userEntity ? plainToClass(UserModel, userEntity) : null;
    }
    //
    // async delete(where: Prisma.UserWhereUniqueInput): Promise<UserModel> {
    //     const userEntity = await this.prisma.user.delete({ where });
    //     // ToDo checkDelresult
    //     return userEntity ? plainToClass(UserModel, userEntity) : null;
    // }

    async isEmailAlreadyExists(email: string): Promise<boolean> {
        const user = await this.findOne({ email });
        return !user;
    }
}

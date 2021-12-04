import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findOne(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
        userSelect?: Prisma.UserSelect
    ): Promise<User | null> {
        const args: Prisma.UserFindUniqueArgs = { where: userWhereUniqueInput, select: userSelect };
        return this.prisma.user.findUnique(args);
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async store(data: Prisma.UserCreateInput): Promise<User> {
        // ToDO remove pass
        return this.prisma.user.create({
            data,
        });
    }

    async update(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }

    async isEmailAlreadyExists(email: string): Promise<boolean> {
        const user = await this.findOne({ email });
        return !user;
    }
}

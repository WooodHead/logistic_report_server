import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(email: string, pass: string): Promise<Partial<User> | null> {
        const user: User = await this.userService.user({ email });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...restUser } = user;
        return user && user.password === pass ? restUser : null;
    }
    //
    // async auto(
    //     userWhereUniqueInput: Prisma.AutoWhereUniqueInput,
    //     params: {
    //         include?: Prisma.AutoInclude;
    //     } = {}
    // ): Promise<Auto | null> {
    //     const { include } = params;
    //     return this.prisma.auto.findUnique({
    //         where: userWhereUniqueInput,
    //         include,
    //     });
    // }
    //
    // async autos(params: {
    //     skip?: number;
    //     take?: number;
    //     cursor?: Prisma.AutoWhereUniqueInput;
    //     where?: Prisma.AutoWhereInput;
    //     orderBy?: Prisma.AutoOrderByInput;
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
    // async updateAuto(params: { where: Prisma.AutoWhereUniqueInput; data: Prisma.AutoUpdateInput }): Promise<Auto> {
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

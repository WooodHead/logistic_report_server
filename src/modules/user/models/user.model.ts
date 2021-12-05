import { Prisma } from '@prisma/client';

export class UserModel {
    static connect(
        user: Prisma.UserUncheckedCreateInput
    ): Prisma.UserCreateNestedOneWithoutReportInput {
        if (!user) {
            return {};
        }

        return {
            connect: { id: user.id },
        };
    }
}

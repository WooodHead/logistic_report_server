import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as faker from 'faker';

export const userSeeder = (n) => {
    const users = [];
    for (let i = 0; i < n; i++) {
        users.push({
            email: faker.internet.email(),
            name: faker.name.findName(),
            password: faker.internet.password(),
            avatar: faker.internet.avatar(),
        });
    }
    return prisma.user.createMany({
        data: users,
    });
};

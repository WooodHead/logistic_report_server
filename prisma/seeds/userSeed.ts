import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as faker from 'faker';

export const userSeeder = (n) => {
    const users = [];
    for (let i = 0; i < n; i++) {
        users.push({
            // email: faker.internet.email(),
            email: 'anton2013ua@gmail.com',
            // name: faker.name.findName(),
            name: 'Anton Polieshchuk',
            // password: faker.internet.password(),
            password: '$2b$10$5tGkvRONzdPxfGgG2Ma0lOSU.wYKs32G3v.jEdAoq6XOHJt1ACrNq',
            avatar: faker.internet.avatar(),
        });
    }
    return prisma.user.createMany({
        data: users,
    });
};

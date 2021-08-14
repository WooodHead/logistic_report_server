import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as faker from 'faker/locale/ru';

export const routeSeeder = () => {
    const routes = [];
    ALL_ROUTES.forEach((route) => {
        routes.push({
            name: route,
            distance: faker.datatype.number(40, 350),
        });
    });
    return prisma.route.createMany({
        data: routes,
    });
};

export const ALL_ROUTES = [
    'Новомосковск - Минск',
    'Киев - Запорожье',
    'Санкт Петербург - Москва',
    'Харьков - Одесса',
    'Краснодар - Баку',
    'Москва - Санкт Петербург',
    'Киев - Стамбул',
];

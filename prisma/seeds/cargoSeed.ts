import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const cargoSeeder = () => {
    const cargos = [];
    ALL_CARGOS.forEach((cargo) => {
        cargos.push({
            name: cargo,
            isDefault: true,
        });
    });
    return prisma.cargo.createMany({
        data: cargos,
    });
};

export const ALL_CARGOS = [
    'подсолнух',
    'отруби',
    'кукуруза',
    'пшеница',
    'соя',
    'сорго',
    'шрот',
    'горох',
    'ячмень',
    'техника',
    'мука',
    'лузга',
    'масло подсолн.',
    'молочная продукция',
    'другое',
];

// export const ALL_CARGOS = [
//     'соняшник',
//     'висівки',
//     'кукурудза',
//     'пшениця',
//     'соя',
//     'сорго',
//     'шрот',
//     'горох',
//     'ячмінь',
//     'техніка',
//     'мука',
//     'лузга',
//     'олія',
//     'молочна продукція',
//     'інше',
// ];

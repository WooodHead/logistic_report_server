import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { ALL_AUTO_BRANDS } from './autoBrandSeed';
// const faker = require('faker')
import * as faker from 'faker/locale/ru';
import { randomFromOneTo } from '../../src/utils/utils';

export const companyWithAutoSeed = async (nCompanies, nAutos) => {
    const companiesWithAutos = [];
    const arrayOfCompaniesInd = Array.from(Array(ALL_COMPANIES_NAMES.length).keys());
    const shuffledArray = arrayOfCompaniesInd.sort(() => 0.5 - Math.random());

    for (let c = 0; c < nCompanies; c++) {
        const company = {
            name: ALL_COMPANIES_NAMES[shuffledArray[c]],
            email: faker.internet.email(),
            code: faker.datatype.number({ min: 10000, max: 99999 }).toString(),
            isCargoOwner: Math.random() > 0.75,
        };

        const companyAutos = [];

        for (let i = 0; i < nAutos; i++) {
            companyAutos.push({
                autoNum: faker.vehicle.vrm(),
                trailNum: faker.vehicle.vrm(),
                driver: faker.name.findName(),
                contact: faker.phone.phoneNumber('(0##)###-##-##'),
                license: faker.random.alpha(3).toUpperCase() + faker.datatype.number(100000, 999999),
                notes: faker.company.catchPhrase(),
                autoBrandId: randomFromOneTo(ALL_AUTO_BRANDS.length),
            });
        }

        companiesWithAutos.push(
            prisma.company.create({
                data: {
                    ...company,
                    autos: {
                        create: companyAutos,
                    },
                },
            })
        );
    }
    return Promise.all(companiesWithAutos);
};

export const ALL_COMPANIES_NAMES = [
    'Транс СФ, ООО',
    'Коломиец А.А. ФЛП',
    'Перспектива НВО',
    'Укравтологистика ООО',
    'ТЭК ООО',
    'МТС-Логистик ООО',
    'ПАС-Транс ООО',
    'Алекси-Транс ЧП',
    'Ховартор Логистик ЧП',
    'Автотрейд+ ЧП',
    'Орион Логистик ООО',
    'Еремейчк Н.В. ФЛП',
    'Чижова В.П. ФЛП',
    'Дженерал-Транс ООО',
];

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { ALL_AUTO_BRANDS } from './autoBrandSeed';
// const faker = require('faker')
import * as faker from 'faker';

export const companyWithAutoSeed = async (nCompanies, nAutos) => {
    const companiesWithAutos = [];

    for (let c = 0; c < nCompanies; c++) {
        const company = {
            name: `${faker.company.companyName()} ${faker.company.companySuffix()}`,
            email: faker.internet.email(),
            code: faker.datatype.number({ min: 10000, max: 99999 }).toString(),
        };

        const companyAutos = [];

        for (let i = 0; i < nAutos; i++) {
            const randomBrand = ALL_AUTO_BRANDS[Math.floor(Math.random() * ALL_AUTO_BRANDS.length)];
            companyAutos.push({
                autoNum: faker.vehicle.vrm(),
                trailNum: faker.vehicle.vrm(),
                driver: faker.name.findName(),
                contact: faker.phone.phoneNumber('(0##)###-##-##'),
                notes: faker.company.catchPhrase(),
                autoBrand: {
                    create: {
                        name: randomBrand,
                    },
                },
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

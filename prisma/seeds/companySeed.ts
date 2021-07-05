import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as faker from 'faker';

export const companySeeder = (nCompanies) => {
    const companies = [];
    for (let i = 0; i < nCompanies; i++) {
        companies.push({
            name: `${faker.company.companySuffix()} ${faker.company.companyName()}`,
            email: faker.internet.email(),
            code: faker.datatype.number({ min: 10000, max: 99999 }).toString(),
        });
    }
    return prisma.company.createMany({
        data: companies,
    });
};

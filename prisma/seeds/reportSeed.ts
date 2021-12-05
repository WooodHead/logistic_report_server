import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as faker from 'faker/locale/ru';
import { ALL_ROUTES } from './routeSeed';
import { ALL_CARGOS } from './cargoSeed';
import { randomFromOneTo, randomNumber } from '../../src/utils/utils';

export const reportSeeder = async (nReports, nCompanies) => {
    const reports = [];

    for (let r = 0; r < nReports; r++) {
        const startDate = new Date(2020, 1, 1);
        const endDate = new Date();
        const rate = randomNumber(100, 1000);

        reports.push(
            prisma.report.create({
                data: {
                    date: new Date(
                        startDate.getTime() +
                            Math.random() * (endDate.getTime() - startDate.getTime())
                    ),
                    routeId: randomFromOneTo(ALL_ROUTES.length),
                    cargoId: randomFromOneTo(ALL_CARGOS.length),
                    autoNum: faker.vehicle.vrm(),
                    driver: faker.name.findName(),
                    autoOwnerId: randomFromOneTo(nCompanies),
                    cargoOwnerId: randomFromOneTo(nCompanies),
                    rate: rate - (rate % 10),
                    userId: 1,
                },
            })
        );
    }
    return Promise.all(reports);
};

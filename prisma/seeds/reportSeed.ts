import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as faker from 'faker/locale/ru';
import { ALL_ROUTES } from './routeSeed';
import { ALL_CARGOS } from './cargoSeed';

export const reportSeeder = async (nReports, nCompanies) => {
    const reports = [];

    for (let r = 0; r < nReports; r++) {
        const routeInd = Math.floor(Math.random() * ALL_ROUTES.length) + 1;
        const cargoInd = Math.floor(Math.random() * ALL_CARGOS.length) + 1;
        const autoOwnerId = Math.floor(Math.random() * (nCompanies - 1)) + 1;
        const cargoOwnerId = Math.floor(Math.random() * (nCompanies - 1)) + 1;
        const startDate = new Date(2021, 1, 1);
        const endDate = new Date();

        reports.push(
            prisma.report.create({
                data: {
                    date: new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())),
                    routeId: routeInd,
                    cargoId: cargoInd,
                    autoNum: faker.vehicle.vrm(),
                    driver: faker.name.findName(),
                    autoOwnerId,
                    cargoOwnerId,
                },
            })
        );
    }
    return Promise.all(reports);
};

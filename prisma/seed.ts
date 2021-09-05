import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { userSeeder } from './seeds/userSeed';
import { companyWithAutoSeed } from './seeds/companyWithAutoSeed';
import { autoBrandSeeder } from './seeds/autoBrandSeed';
import { cargoSeeder } from './seeds/cargoSeed';
import { routeSeeder } from './seeds/routeSeed';
import { reportSeeder } from './seeds/reportSeed';

const TOTAL_COMPANIES = 12;

async function main() {
    await autoBrandSeeder();
    await userSeeder(2);
    await companyWithAutoSeed(TOTAL_COMPANIES, 150);
    await cargoSeeder();
    await routeSeeder();
    await reportSeeder(1000, TOTAL_COMPANIES);

    process.exit(0);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { userSeeder } from './seeds/userSeed';
import { companyWithAutoSeed } from './seeds/companyWithAutoSeed';
import { autoBrandSeeder } from './seeds/autoBrandSeed';
import { cargoSeeder } from './seeds/cargoSeed';

async function main() {
    await Promise.all([autoBrandSeeder(), userSeeder(2), companyWithAutoSeed(12, 150), cargoSeeder()]);
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

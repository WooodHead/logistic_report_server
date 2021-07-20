import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { userSeeder } from './seeds/userSeed';
import { companyWithAutoSeed } from './seeds/companyWithAutoSeed';
import { autoBrandSeeder } from './seeds/autoBrandSeed';

async function main() {
    await Promise.all([autoBrandSeeder(), userSeeder(2), companyWithAutoSeed(12, 150)]);
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

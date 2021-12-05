import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const autoBrandSeeder = () => {
    const autoBrands = [];
    ALL_AUTO_BRANDS.forEach((brand) => {
        autoBrands.push({
            name: brand,
            isDefault: true,
        });
    });
    return prisma.autoBrand.createMany({
        data: autoBrands,
    });
};

export const ALL_AUTO_BRANDS = [
    'Abarth',
    'Audi',
    'Citroën',
    'Dacia',
    'Daewoo',
    'Daihatsu',
    'Dodge',
    'Donkervoort',
    'DS',
    'Fiat',
    'Fisker',
    'Ford',
    'Honda',
    'Hyundai',
    'Iveco',
    'Kia',
    'KTM',
    'Lada',
    'Lancia',
    'Landwind',
    'Lotus',
    'Mazda',
    'Mercedes-Benz',
    'MG',
    'Mini',
    'Mitsubishi',
    'Morgan',
    'Nissan',
    'Opel',
    'Peugeot',
    'Renault',
    'Saab',
    'Seat',
    'Skoda',
    'Smart',
    'SsangYong',
    'Subaru',
    'Suzuki',
    'TATA',
    'Toyota',
    'Volkswagen',
    'Volvo',
    'ГАЗ-3302',
    'ГАЗ-3307',
    'ГАЗ-2705',
    'ЗИЛ',
    'КАМАЗ',
];

/*
  Warnings:

  - You are about to drop the column `brandId` on the `Auto.model.ts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Auto` DROP FOREIGN KEY `Auto_ibfk_2`;

-- AlterTable
ALTER TABLE `Auto` DROP COLUMN `brandId`,
    ADD COLUMN `autoBrandId` INTEGER;

-- AddForeignKey
ALTER TABLE `Auto` ADD FOREIGN KEY (`autoBrandId`) REFERENCES `AutoBrand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

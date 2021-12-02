/*
  Warnings:

  - You are about to drop the column `companyId` on the `Report` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Report` DROP FOREIGN KEY `Report_ibfk_3`;

-- AlterTable
ALTER TABLE `Report` DROP COLUMN `companyId`,
    ADD COLUMN `autoOwnerId` INTEGER,
    ADD COLUMN `cargoOwnerId` INTEGER;

-- AddForeignKey
ALTER TABLE `Report` ADD FOREIGN KEY (`autoOwnerId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD FOREIGN KEY (`cargoOwnerId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

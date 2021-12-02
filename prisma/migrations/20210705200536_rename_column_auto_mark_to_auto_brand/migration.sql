/*
  Warnings:

  - You are about to drop the column `markId` on the `Auto.model.ts` table. All the data in the column will be lost.
  - You are about to drop the `AutoMark` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Auto` DROP FOREIGN KEY `Auto_ibfk_2`;

-- AlterTable
ALTER TABLE `Auto` DROP COLUMN `markId`,
    ADD COLUMN `brandId` INTEGER;

-- DropTable
DROP TABLE `AutoMark`;

-- CreateTable
CREATE TABLE `AutoBrand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Auto` ADD FOREIGN KEY (`brandId`) REFERENCES `AutoBrand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

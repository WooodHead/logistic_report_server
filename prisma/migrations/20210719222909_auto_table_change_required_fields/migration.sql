/*
  Warnings:

  - Made the column `autoNum` on table `Auto.model.ts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Auto` MODIFY `autoNum` VARCHAR(191) NOT NULL,
    MODIFY `driver` VARCHAR(191),
    MODIFY `contact` VARCHAR(191),
    MODIFY `notes` VARCHAR(191);

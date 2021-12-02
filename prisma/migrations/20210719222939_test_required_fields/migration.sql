/*
  Warnings:

  - Made the column `trailNum` on table `Auto.model.ts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Auto` MODIFY `trailNum` VARCHAR(191) NOT NULL;

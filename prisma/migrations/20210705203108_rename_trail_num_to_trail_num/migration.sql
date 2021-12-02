/*
  Warnings:

  - You are about to drop the column `trailnum` on the `Auto.model.ts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Auto` DROP COLUMN `trailnum`,
    ADD COLUMN `trailNum` VARCHAR(191);

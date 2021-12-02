/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AutoBrand` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `AutoBrand.name_unique` ON `AutoBrand`(`name`);

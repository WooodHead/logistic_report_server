-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `routeId` INTEGER NOT NULL,
    `cargoId` INTEGER NOT NULL,
    `companyId` INTEGER,
    `autoNum` VARCHAR(191),
    `driver` VARCHAR(191),
    `rate` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Report` ADD FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD FOREIGN KEY (`cargoId`) REFERENCES `Cargo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

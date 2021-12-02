-- CreateTable
CREATE TABLE `Auto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER,
    `markId` INTEGER,
    `autoNum` VARCHAR(191),
    `trailnum` VARCHAR(191),
    `driver` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Auto` ADD FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Auto` ADD FOREIGN KEY (`markId`) REFERENCES `AutoMark`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

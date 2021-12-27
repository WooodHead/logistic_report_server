-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_userId_fkey`;

-- AlterTable
ALTER TABLE `Subscription` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE `ProjectsInvitedTo` DROP FOREIGN KEY `ProjectsInvitedTo_userId_fkey`;

-- AddForeignKey
ALTER TABLE `ProjectsInvitedTo` ADD CONSTRAINT `ProjectsInvitedTo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

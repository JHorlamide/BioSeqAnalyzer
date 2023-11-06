/*
  Warnings:

  - A unique constraint covering the columns `[invitationToken]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Invitation` MODIFY `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX `Invitation_invitationToken_key` ON `Invitation`(`invitationToken`);

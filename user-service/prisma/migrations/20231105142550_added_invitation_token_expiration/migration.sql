/*
  Warnings:

  - Added the required column `invitationTokenExpiration` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invitation` ADD COLUMN `invitationTokenExpiration` BIGINT NOT NULL;

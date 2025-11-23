/*
  Warnings:

  - You are about to drop the column `sCorrect` on the `answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `answers` DROP COLUMN `sCorrect`,
    ADD COLUMN `isCorrect` BOOLEAN NOT NULL DEFAULT false;

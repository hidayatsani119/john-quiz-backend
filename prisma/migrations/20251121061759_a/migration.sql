/*
  Warnings:

  - You are about to drop the column `isCorret` on the `options` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `options` DROP COLUMN `isCorret`,
    ADD COLUMN `isCorrect` BOOLEAN NOT NULL DEFAULT false;

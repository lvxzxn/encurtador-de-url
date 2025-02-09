/*
  Warnings:

  - Added the required column `clicks` to the `ShortLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShortLink" ADD COLUMN     "clicks" INTEGER NOT NULL;

/*
  Warnings:

  - You are about to drop the column `clicks` on the `ShortLink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShortLink" DROP COLUMN "clicks";

-- CreateTable
CREATE TABLE "ShortClicks" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL,

    CONSTRAINT "ShortClicks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortClicks_link_key" ON "ShortClicks"("link");

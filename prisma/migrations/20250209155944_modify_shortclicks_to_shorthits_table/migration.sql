/*
  Warnings:

  - You are about to drop the `ShortClicks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ShortClicks";

-- CreateTable
CREATE TABLE "ShortHits" (
    "id" TEXT NOT NULL,
    "short_id" TEXT NOT NULL,
    "addr" TEXT NOT NULL,

    CONSTRAINT "ShortHits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortHits_short_id_key" ON "ShortHits"("short_id");

-- CreateIndex
CREATE UNIQUE INDEX "ShortHits_addr_key" ON "ShortHits"("addr");

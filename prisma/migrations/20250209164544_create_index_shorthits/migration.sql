/*
  Warnings:

  - A unique constraint covering the columns `[addr]` on the table `ShortHits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShortHits_addr_key" ON "ShortHits"("addr");

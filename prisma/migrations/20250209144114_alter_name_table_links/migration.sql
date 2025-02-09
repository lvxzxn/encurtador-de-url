/*
  Warnings:

  - You are about to drop the column `link` on the `ShortClicks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[short_id]` on the table `ShortClicks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `short_id` to the `ShortClicks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ShortClicks_link_key";

-- AlterTable
ALTER TABLE "ShortClicks" DROP COLUMN "link",
ADD COLUMN     "short_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ShortClicks_short_id_key" ON "ShortClicks"("short_id");

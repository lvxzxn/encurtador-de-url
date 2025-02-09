-- CreateTable
CREATE TABLE "ShortLink" (
    "id" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "shortened" TEXT NOT NULL,
    "addr" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShortLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_original_key" ON "ShortLink"("original");

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_shortened_key" ON "ShortLink"("shortened");

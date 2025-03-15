/*
  Warnings:

  - You are about to drop the column `courses` on the `Transcript` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "courses";

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coefficient" DOUBLE PRECISION NOT NULL,
    "unity" TEXT NOT NULL,
    "credit" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TranscriptModule" (
    "id" TEXT NOT NULL,
    "transcriptId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TranscriptModule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TranscriptModule" ADD CONSTRAINT "TranscriptModule_transcriptId_fkey" FOREIGN KEY ("transcriptId") REFERENCES "Transcript"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscriptModule" ADD CONSTRAINT "TranscriptModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

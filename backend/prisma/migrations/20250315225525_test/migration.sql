/*
  Warnings:

  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transcript` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TranscriptModule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transcript" DROP CONSTRAINT "Transcript_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TranscriptModule" DROP CONSTRAINT "TranscriptModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "TranscriptModule" DROP CONSTRAINT "TranscriptModule_transcriptId_fkey";

-- DropTable
DROP TABLE "Module";

-- DropTable
DROP TABLE "Transcript";

-- DropTable
DROP TABLE "TranscriptModule";

-- DropEnum
DROP TYPE "TranscriptStatus";

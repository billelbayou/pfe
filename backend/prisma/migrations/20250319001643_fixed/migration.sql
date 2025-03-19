/*
  Warnings:

  - You are about to drop the column `transcriptId` on the `Course` table. All the data in the column will be lost.
  - Added the required column `uniteId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `semester` on the `Transcript` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('S1', 'S2', 'S3', 'S4', 'S5', 'S6');

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_transcriptId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "transcriptId",
ADD COLUMN     "moy" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "uniteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transcript" ADD COLUMN     "year" INTEGER NOT NULL,
DROP COLUMN "semester",
ADD COLUMN     "semester" "Semester" NOT NULL;

-- DropEnum
DROP TYPE "Semster";

-- CreateTable
CREATE TABLE "Unite" (
    "id" TEXT NOT NULL,
    "transcriptId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coef" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "credit" INTEGER NOT NULL DEFAULT 0,
    "moy" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Unite" ADD CONSTRAINT "Unite_transcriptId_fkey" FOREIGN KEY ("transcriptId") REFERENCES "Transcript"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_uniteId_fkey" FOREIGN KEY ("uniteId") REFERENCES "Unite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

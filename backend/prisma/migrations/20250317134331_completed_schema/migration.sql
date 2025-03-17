/*
  Warnings:

  - You are about to drop the column `grade` on the `Course` table. All the data in the column will be lost.
  - Added the required column `semster` to the `Transcript` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Semster" AS ENUM ('S1', 'S2', 'S3', 'S4', 'S5', 'S6');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "grade",
ADD COLUMN     "coefficient" DOUBLE PRECISION NOT NULL DEFAULT 1,
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "exam" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "td" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "tp" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Transcript" ADD COLUMN     "average" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "semster" "Semster" NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

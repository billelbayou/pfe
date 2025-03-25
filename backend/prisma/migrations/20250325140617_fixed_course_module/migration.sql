/*
  Warnings:

  - You are about to alter the column `coefficient` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "coefficient" SET DEFAULT 1,
ALTER COLUMN "coefficient" SET DATA TYPE INTEGER,
ALTER COLUMN "td" DROP NOT NULL,
ALTER COLUMN "td" DROP DEFAULT,
ALTER COLUMN "tp" DROP NOT NULL,
ALTER COLUMN "tp" DROP DEFAULT;

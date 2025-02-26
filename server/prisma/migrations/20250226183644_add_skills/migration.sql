/*
  Warnings:

  - You are about to drop the column `level` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Skill` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Skill_userId_idx";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "level",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "proficiency" INTEGER NOT NULL DEFAULT 0;

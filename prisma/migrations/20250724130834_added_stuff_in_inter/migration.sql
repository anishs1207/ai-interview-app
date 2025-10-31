/*
  Warnings:

  - You are about to drop the column `InterviewerFirstMessage` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `InterviewerPrompt` on the `Interview` table. All the data in the column will be lost.
  - Added the required column `interviewerFirstMessage` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interviewerName` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interviewerPrompt` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "InterviewerFirstMessage",
DROP COLUMN "InterviewerPrompt",
ADD COLUMN     "interviewerFirstMessage" TEXT NOT NULL,
ADD COLUMN     "interviewerName" TEXT NOT NULL,
ADD COLUMN     "interviewerPrompt" TEXT NOT NULL;

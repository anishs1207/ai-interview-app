-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('TECH', 'BEHAVE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isRecruiter" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "theme" "Theme" NOT NULL,
    "positionTitle" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "InterviewerPrompt" TEXT NOT NULL,
    "InterviewerFirstMessage" TEXT NOT NULL,
    "maxDurationInMinutes" INTEGER NOT NULL,
    "vapiAssistantId" TEXT NOT NULL,
    "QuestionsToAsk" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CandidateInterview" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CandidateInterview_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Interview_userId_key" ON "Interview"("userId");

-- CreateIndex
CREATE INDEX "_CandidateInterview_B_index" ON "_CandidateInterview"("B");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateInterview" ADD CONSTRAINT "_CandidateInterview_A_fkey" FOREIGN KEY ("A") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateInterview" ADD CONSTRAINT "_CandidateInterview_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

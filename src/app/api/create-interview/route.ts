import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"; 
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
        positionTitle,
        isActive,
        interviewTheme,
        duration,
        startMessage,
        interviewerNature,
        questions,
        prompt,
        userId
    } = body;

    if (
      !positionTitle || 
      !isActive || 
      !interviewTheme || 
      !duration || 
      !startMessage || 
      !interviewerNature || 
      !questions ||
      !prompt ||
      !userId
    ) {
        return NextResponse.json({
            success: false,
            message: "All fields are not present"
        }, {status: 400})
    }

    const createAssistantPayload = {
      positionTitle,
      interviewTheme,
      startMessage,
      interviewerNature,
      prompt,
      questions
    }

    const response = await axios.post('http://localhost:3000/api/create-assistant', createAssistantPayload, {
      headers: {
    'Content-Type': 'application/json',
      }
    });

    const vapiId = response.data.assistantId;

    if (!vapiId) {
      return NextResponse.json({
        success: false,
        message: "Unable to get the vapiId from api.vapi.ai"
      }, {status: 400})
    }

    console.log("vapiid", vapiId);

    const newInterview = await prisma.interview.create({
      data: {
        theme: interviewTheme,
        positionTitle,
        active: Boolean(isActive),
        interviewerPrompt: prompt,
        interviewerFirstMessage: startMessage,
        maxDurationInMinutes: Number(duration),
        vapiAssistantId: vapiId,
        QuestionsToAsk: questions,
        interviewerName: interviewerNature, 
        recruiter: {
          connect: { id: userId },
        },
      },
    });

    console.log(newInterview);

    return NextResponse.json(
      { success: true, interview: newInterview },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating interview:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import {z} from "zod";

export const interviewSchema = z.object({
    positionTitle: z.string().min(1, "Positon title is required"),
    isActive: z.boolean(),
    interviewTheme: z.enum(["TECHNICAL", "BEHAVIORAL"]),
    duration: z.number().int().min(1, "Duration must be at least 1 minute"),
    prompt: z.string().min(1, "Interviewer prompt is required"),
    startMessage: z.string().min(1, "Interviewer first message is required"),
    interviewerNature: z.string().min(1, "Interviewer name is required"),
    questions: z.array(z.string().min(1)).min(1, "At least one question is required"),
    userId: z.string().uuid("User ID must be a valid UUID")
})


export type InterviewFormData = z.infer<typeof interviewSchema>;
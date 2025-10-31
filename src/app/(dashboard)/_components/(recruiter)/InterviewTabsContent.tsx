'use client';

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Calendar,
    Clock,
    Star,
    Play,
    Eye,
    X,
    MoreHorizontal,
} from "lucide-react";

interface Interview {
    id: string;
    theme: 'TECH' | 'BEHAVE';
    positionTitle: string;
    active: boolean;
    InterviewerPrompt: string;
    InterviewerFirstMessage: string;
    maxDurationInMinutes: number;
    vapiAssistantId: string;
    QuestionsToAsk: string[];
    userId: string;
    // Optional UI fields
    candidate?: string;
    date?: string;
    time?: string;
    status?: string;
    aiScore?: number;
}

interface InterviewTabsContentProps {
    interviews: Interview[];
    onStartInterview: (interview: Interview) => void;
}

export function InterviewTabsContent({
    interviews,
    onStartInterview,
}: InterviewTabsContentProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Scheduled Interviews</CardTitle>
                <CardDescription>
                    Manage and monitor your upcoming interviews
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {interviews.map((interview) => (
                        <Card
                            key={interview.id}
                            className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white"
                        >
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    {/* Left section */}
                                    <div className="flex items-start sm:items-center gap-4 w-full">
                                        <div className="relative shrink-0">
                                            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                {(interview.candidate ?? "AI")
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </div>
                                            {interview.status === "in-progress" && (
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-slate-900 text-lg">
                                                    {interview.positionTitle}
                                                </h3>
                                                <Badge
                                                    variant="secondary"
                                                    className={
                                                        interview.theme === "TECH"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-green-100 text-green-800"
                                                    }
                                                >
                                                    {interview.theme}
                                                </Badge>
                                            </div>
                                            <p className="text-slate-600 font-medium mb-2">
                                                {interview.candidate || ""}
                                            </p>
                                            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                                                <span className="flex items-center space-x-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        {interview.date ?? "TBD"} at {interview.time ?? "TBD"}
                                                    </span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{interview.maxDurationInMinutes} min</span>
                                                </span>
                                                {interview.aiScore !== undefined && (
                                                    <span className="flex items-center space-x-1">
                                                        <Star className="w-4 h-4 text-yellow-500" />
                                                        <span className="font-medium">
                                                            {interview.aiScore}/10
                                                        </span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right section */}
                                    <div className="flex flex-row items-start gap-2 sm:gap-3 shrink-0">
                                        <Badge
                                            className={`flex items-center ${interview.status === "completed"
                                                ? "bg-green-100 text-green-800 border-green-200"
                                                : interview.status === "in-progress"
                                                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                    : "bg-blue-100 text-blue-800 border-blue-200"
                                                }`}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full mr-2 ${interview.status === "completed"
                                                    ? "bg-green-500"
                                                    : interview.status === "in-progress"
                                                        ? "bg-yellow-500"
                                                        : "bg-blue-500"
                                                    }`}
                                            ></span>
                                            {interview.status ?? "scheduled"}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

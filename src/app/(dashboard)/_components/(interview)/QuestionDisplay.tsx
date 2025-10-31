'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

interface QuestionDisplayProps {
    question: string;
    tag?: string;
    expectedTime?: string;
}

export default function QuestionDisplay({
    question,
    tag = "Technical",
    expectedTime = "3–5 mins",
}: QuestionDisplayProps) {
    return (
        <Card className="rounded-2xl shadow-md border border-gray-100">
            <CardContent className="p-6 pt-2 pb-2">
                <div className="flex items-start gap-5">
                    <div className="p-3 min-w-[44px] h-11 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                        <MessageSquare className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1">
                        <h4 className="text-base font-semibold text-gray-800 mb-1">
                            Current Question
                        </h4>
                        <p className="text-gray-700 text-lg leading-relaxed mb-3">
                            {question}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            <Badge variant="outline" className="text-blue-600 border-blue-600 px-2 py-0.5">
                                {tag}
                            </Badge>
                            <span className="text-gray-500">⏱ Expected answer time: {expectedTime}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

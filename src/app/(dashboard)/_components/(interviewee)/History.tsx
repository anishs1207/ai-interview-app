"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

interface Interview {
    id: number;
    type: string;
    date: string;
    score: number;
    areas: string[];
    feedback: string;
}

interface InterviewHistoryCardProps {
    history: Interview[];
}

export function History({ history }: InterviewHistoryCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Interview History</CardTitle>
                <CardDescription>Your past mock interviews and performance</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {history.map((interview) => (
                        <div
                            key={interview.id}
                            className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-semibold">
                                    {interview.score}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">{interview.type}</h3>
                                    <p className="text-sm text-slate-600">{interview.date}</p>
                                    <div className="flex items-center space-x-2 mt-1">
                                        {interview.areas.map((area, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-xs">
                                                {area}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="flex items-center space-x-1 mb-1">
                                    <Target className="w-4 h-4 text-yellow-500" />
                                    <span className="font-semibold">{interview.score}/10</span>
                                </div>
                                <p className="text-xs text-slate-500 max-w-xs">{interview.feedback}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

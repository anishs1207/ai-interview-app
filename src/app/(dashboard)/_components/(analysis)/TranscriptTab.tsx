"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export function TranscriptTab({
    transcript,
}: {
    transcript: { speaker: string; time: string; text: string }[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <span>Interview Transcript</span>
                </CardTitle>
                <CardDescription>Complete conversation log with timestamps</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {transcript.map((entry, index) => (
                        <div
                            key={index}
                            className={`flex space-x-4 ${entry.speaker === "AI Interviewer" ? "justify-start" : "justify-end"}`}
                        >
                            <div
                                className={`max-w-3xl p-4 rounded-lg ${entry.speaker === "AI Interviewer"
                                    ? "bg-blue-50 border-l-4 border-blue-400"
                                    : "bg-green-50 border-r-4 border-green-400"
                                    }`}
                            >
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="font-semibold text-sm">{entry.speaker}</span>
                                    <span className="text-xs text-slate-500">{entry.time}</span>
                                </div>
                                <p className="text-slate-700">{entry.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

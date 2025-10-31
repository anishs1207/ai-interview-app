"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AnalyticsTab,
    FeedbackTab,
    TranscriptTab,
    ScoresTab
} from "./"

interface TabsComponentProps {
    scores: {
        category: string;
        score: number;
        trend: "up" | "down" | "neutral";
        description: string;
    }[];
    strengths: string[];
    improvements: string[];
    transcript: {
        speaker: string;
        time: string;
        text: string;
    }[];
}

export function InterviewTabs({ scores, strengths, improvements, transcript }: TabsComponentProps) {
    return (
        <Tabs defaultValue="scores" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
                <TabsTrigger value="scores">Detailed Scores</TabsTrigger>
                <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="scores" className="space-y-6">
                <ScoresTab scores={scores} strengths={strengths} improvements={improvements} />
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
                <FeedbackTab />
            </TabsContent>

            <TabsContent value="transcript" className="space-y-6">
                <TranscriptTab transcript={transcript} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
                <AnalyticsTab />
            </TabsContent>

        </Tabs>
    );
}

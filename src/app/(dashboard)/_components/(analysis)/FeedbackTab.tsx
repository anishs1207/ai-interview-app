"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";

export function FeedbackTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span>AI-Generated Feedback</span>
                </CardTitle>
                <CardDescription>Comprehensive analysis powered by advanced AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="prose max-w-none">
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Executive Summary</h4>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        The candidate demonstrated strong technical competency and excellent communication skills throughout the interview...
                    </p>
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Technical Assessment</h4>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        Strong foundation in React ecosystem with good understanding of performance optimization techniques...
                    </p>
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Behavioral Observations</h4>
                    <p className="text-slate-700 leading-relaxed">
                        Maintained professional demeanor throughout the interview...
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

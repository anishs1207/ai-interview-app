'use client';

import { ArrowLeft, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InterviewResultsHeaderProps {
    interview: {
        title?: string;
        category?: string;
        candidate?: string;
    };
    duration: string;
    onBackToDashboard: () => void;
}

export function InterviewResultsHeader({
    interview,
    duration,
    onBackToDashboard,
}: InterviewResultsHeaderProps) {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Left side */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <Button
                    variant="outline"
                    onClick={onBackToDashboard}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Dashboard</span>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Interview Results</h1>
                    <p className="text-slate-600">
                        {interview.title || interview.category} • {interview.candidate || "Mock Interview"} • Time: {duration}
                    </p>
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-3">
                <Button variant="outline" className="flex items-center space-x-2">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                </Button>
                <Button className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                </Button>
            </div>
        </div>
    );
}

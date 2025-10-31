'use client';

import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface VideoCallTopBarProps {
    timeElapsed: number;
    currentQuestion: number;
    totalQuestions: number;
    progress: number;
}

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function VideoCallTopBar({
    timeElapsed,
    currentQuestion,
    totalQuestions,
    progress,
}: VideoCallTopBarProps) {
    return (
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* Left group */}
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-700">Recording</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{formatTime(timeElapsed)}</span>
                    </div>

                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                        Question {currentQuestion}/{totalQuestions}
                    </Badge>
                </div>

                {/* Progress bar */}
                <Progress
                    value={progress}
                    className="w-full sm:w-64 h-1 bg-gray-200 transition-all duration-300"
                />
            </div>
        </div>
    );
}

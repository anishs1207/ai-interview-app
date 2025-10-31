'use client';

import React, { useEffect, useState } from 'react';
import { Brain, Target, Activity } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface AISidebarProps {
    interview: {
        duration: number;
    };
    currentQuestion: number;
    totalQuestions: number;
}

const AISidebar: React.FC<AISidebarProps> = ({
    interview,
    currentQuestion,
    totalQuestions,
}) => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const duration = interview.duration || 60;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <aside className="w-full px-6 py-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 lg:py-8 shadow-sm  max-h-[90vh] lg:max-h-none">
            <div className="space-y-8">
                {/* AI Interview Coach Header */}
                <section>
                    <h3 className="text-lg font-semibold flex items-center text-gray-800 mb-4">
                        <Brain className="w-5 h-5 mr-2 text-blue-600" />
                        AI Interview Coach
                        <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">Live</Badge>
                    </h3>

                    {/* Feedback Highlights */}
                    <div className="space-y-3">
                        <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-md text-sm text-green-800">
                            Great eye contact and confident posture.
                        </div>
                        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-md text-sm text-yellow-800">
                            Consider providing more specific examples.
                        </div>
                        <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-md text-sm text-blue-800">
                            Good response timing (avg. 3.2s).
                        </div>
                    </div>
                </section>

                {/* Performance Metrics */}
                <section>
                    <h4 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2 text-purple-500" />
                        Performance Metrics
                    </h4>
                    <div className="space-y-4">
                        {[
                            { label: 'Communication', score: 85 },
                            { label: 'Technical Depth', score: 78 },
                            { label: 'Problem Solving', score: 82 },
                            { label: 'Cultural Fit', score: 87 },
                        ].map(({ label, score }) => (
                            <div key={label}>
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>{label}</span>
                                    <span className="font-medium text-gray-900">
                                        {(score / 10).toFixed(1)}/10
                                    </span>
                                </div>
                                <Progress value={score} className="h-2" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Interview Analytics */}
                <section>
                    <h4 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                        <Activity className="w-4 h-4 mr-2 text-orange-400" />
                        Interview Analytics
                    </h4>
                    <div className="text-sm text-gray-600 space-y-3">
                        <div className="flex justify-between">
                            <span>Speaking Time</span>
                            <span className="font-semibold text-gray-800">68%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Avg Response Time</span>
                            <span className="font-semibold text-gray-800">3.2s</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Questions Answered</span>
                            <span className="font-semibold text-gray-800">
                                {Math.max(currentQuestion - 1, 0)}/{totalQuestions}
                            </span>
                        </div>
                        {/* <div className="flex justify-between items-center space-x-4">
                            <span className="text-wrap break-words">Time Remaining</span>
                            <span className="font-semibold text-gray-800 text-right truncate">
                                {formatTime(duration * 60 - timeElapsed)}
                            </span>
                        </div> */}

                    </div>
                </section>
            </div>
        </aside>
    );
};

export default AISidebar;

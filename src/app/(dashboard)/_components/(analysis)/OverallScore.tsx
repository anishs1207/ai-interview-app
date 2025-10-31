'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock } from "lucide-react";

interface OverallScoreCardProps {
    overallScore: number;
    duration: string;
}

export function OverallScoreCard({ overallScore, duration }: OverallScoreCardProps) {
    const getPerformanceText = (score: number) => {
        if (score >= 8) return "Excellent Performance";
        if (score >= 7) return "Good Performance";
        if (score >= 6) return "Average Performance";
        return "Needs Improvement";
    };

    return (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    {/* Left Side */}
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                            Overall Score: {overallScore}/10
                        </h2>
                        <p className="text-slate-600 text-lg">{getPerformanceText(overallScore)}</p>
                        <div className="flex items-center space-x-4 mt-4">
                            <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Recommended for next round
                            </Badge>
                            <div className="flex items-center space-x-1 text-sm text-slate-600">
                                <Clock className="w-4 h-4" />
                                <span>Completed in {duration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Circular Chart */}
                    <div className="text-right sm:text-left sm:self-start">
                        <div className="w-32 h-32 relative mx-auto sm:mx-0">
                            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="2"
                                    strokeDasharray={`${overallScore * 10}, 100`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold text-slate-900">{overallScore}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

    );
}

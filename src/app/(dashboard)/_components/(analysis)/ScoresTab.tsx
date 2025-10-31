"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, TrendingUp, TrendingDown, Target } from "lucide-react";

export function ScoresTab({
    scores,
    strengths,
    improvements,
}: {
    scores: {
        category: string;
        score: number;
        trend: "up" | "down" | "neutral";
        description: string;
    }[];
    strengths: string[];
    improvements: string[];
}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        <span>Category Breakdown</span>
                    </CardTitle>
                    <CardDescription>Detailed scoring across different competencies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {scores.map((score, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-slate-900">{score.category}</span>
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold">{score.score}/10</span>
                                    {score.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                                    {score.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                                </div>
                            </div>
                            <Progress value={score.score * 10} className="h-2" />
                            <p className="text-sm text-slate-600">{score.description}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-green-700">Key Strengths</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {strengths.map((strength, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-slate-700">{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-orange-700">Areas for Improvement</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {improvements.map((improvement, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                    <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-slate-700">{improvement}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

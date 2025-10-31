"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Interview {
    id: number;
    company: string;
    position: string;
    date: string;
    time: string;
    duration: number;
    type: string;
}

interface UpcomingInterviewsCardProps {
    interviews: Interview[];
    onStartInterview: (interview: Interview) => void;
}

export function Upcoming({
    interviews,
    onStartInterview,
}: UpcomingInterviewsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Your scheduled interviews with companies</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {interviews.map((interview) => (
                        <div
                            key={interview.id}
                            className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                                    {interview.company.split(" ")[0][0]}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">{interview.position}</h3>
                                    <p className="text-sm text-slate-600">{interview.company}</p>
                                    <div className="flex items-center space-x-4 mt-1">
                                        <span className="text-sm text-slate-500 flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {interview.date} at {interview.time}
                                        </span>
                                        <span className="text-sm text-slate-500 flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {interview.duration} min
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                                    {interview.type}
                                </Badge>
                                <Button
                                    size="sm"
                                    onClick={() => onStartInterview(interview)}
                                    className="flex items-center space-x-2"
                                >
                                    <Video className="w-4 h-4" />
                                    <span>Join</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

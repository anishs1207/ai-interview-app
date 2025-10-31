"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function AnalyticsTab() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Speaking Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">32:15</div>
                    <p className="text-sm text-slate-600">70% of total time</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">8/8</div>
                    <p className="text-sm text-slate-600">100% completion rate</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">4.2s</div>
                    <p className="text-sm text-slate-600">Quick thinking</p>
                </CardContent>
            </Card>
        </div>
    );
}

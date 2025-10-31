"use client";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function AnalyticsTabsContent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Interview Analytics</CardTitle>
                <CardDescription>
                    Deep insights into your interview performance and AI scoring
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12">
                    <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">
                        Advanced analytics dashboard coming soon
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

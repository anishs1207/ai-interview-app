'use client';

import React, { useState, useEffect } from "react";
import {
    RecruiterDashboard,
    IntervieweeDashboard,
    VideoCallInterface,
} from "../_components";
import { InterviewResults } from "../_components";
import { Navbar, Footer } from "@/components/layout";

type ViewMode = "recruiter" | "interviewee" | "video-call" | "results";

const DashboardPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>("recruiter");
    const [selectedInterview, setSelectedInterview] = useState<any>(null);

    const handleStartInterview = (interview: any) => {
        setSelectedInterview(interview);
        setViewMode("video-call");
    };

    const handleEndInterview = () => {
        setViewMode("results");
    };

    const handleBackToDashboard = () => {
        setSelectedInterview(null);
        setViewMode("recruiter");
    };

    useEffect(() => {
        if (viewMode === "video-call") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [viewMode]);

    return (
        <>
            {/* @ts-ignore */}
            <Navbar viewMode={viewMode} setViewMode={setViewMode} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {viewMode === "recruiter" && <RecruiterDashboard onStartInterview={handleStartInterview} />}
                {viewMode === "interviewee" && <IntervieweeDashboard onStartInterview={handleStartInterview} />}
                {viewMode === "video-call" && selectedInterview && (
                    <VideoCallInterface interview={selectedInterview} onEndInterview={handleEndInterview} />
                )}
                {viewMode === "results" && selectedInterview && (
                    <InterviewResults interview={selectedInterview} onBackToDashboard={handleBackToDashboard} />
                )}
            </main>
            <Footer />
        </>
    );
};

export default DashboardPage;

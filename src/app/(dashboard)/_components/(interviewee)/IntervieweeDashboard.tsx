"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upcoming } from "./Upcoming"
import { History } from "./History"

interface IntervieweeDashboardProps {
  onStartInterview: (interview: any) => void
}

export function IntervieweeDashboard({ onStartInterview }: IntervieweeDashboardProps) {
  const [isMockDialogOpen, setIsMockDialogOpen] = useState(false)

  const upcomingInterviews = [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      date: "2024-01-15",
      time: "2:00 PM",
      type: "technical",
      duration: 60,
      interviewer: "Sarah Wilson",
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      date: "2024-01-18",
      time: "10:30 AM",
      type: "mixed",
      duration: 90,
      interviewer: "Mike Johnson",
    },
  ]

  const mockInterviewHistory = [
    {
      id: 1,
      type: "Frontend Developer",
      date: "2024-01-10",
      score: 8.2,
      areas: ["React", "JavaScript", "CSS"],
      feedback: "Strong technical knowledge, good problem-solving approach",
    },
    {
      id: 2,
      type: "Product Manager",
      date: "2024-01-08",
      score: 7.5,
      areas: ["Strategy", "Communication", "Analytics"],
      feedback: "Good strategic thinking, could improve on data analysis",
    },
  ]

  return (
    <div className="space-y-8">

      <Tabs defaultValue="upcoming" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming">Active Interviews</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming" className="space-y-6">
          <Upcoming
            interviews={upcomingInterviews}
            onStartInterview={onStartInterview}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <History
            history={mockInterviewHistory} />
        </TabsContent>
      </Tabs>
    </div>
  )
}



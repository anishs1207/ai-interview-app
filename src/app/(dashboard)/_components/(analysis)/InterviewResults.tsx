"use client"

import { InterviewResultsHeader } from "./Header";
import { OverallScoreCard } from "./OverallScore";
import { InterviewTabs } from "./InterviewTabs"

interface InterviewResultsProps {
  interview: any
  onBackToDashboard: () => void
}

export function InterviewResults({ interview, onBackToDashboard }: InterviewResultsProps) {
  const overallScore = 8.2
  const duration = "45:32"

  const scores: { category: string; score: number; trend: "up" | "neutral" | "down"; description: string; }[] = [
    {
      category: "Communication Skills",
      score: 8.5,
      trend: "up",
      description: "Clear articulation and professional demeanor",
    },
    { category: "Technical Knowledge", score: 7.8, trend: "up", description: "Strong understanding of core concepts" },
    { category: "Problem Solving", score: 8.2, trend: "up", description: "Systematic approach to complex problems" },
    { category: "Cultural Fit", score: 8.0, trend: "neutral", description: "Aligns well with company values" },
    { category: "Leadership Potential", score: 7.5, trend: "down", description: "Shows promise but needs development" },
  ]

  const strengths = [
    "Excellent communication and presentation skills",
    "Strong technical foundation in React and JavaScript",
    "Good problem-solving methodology",
    "Professional demeanor throughout the interview",
    "Asked thoughtful questions about the role",
  ]

  const improvements = [
    "Could provide more specific examples from past experience",
    "System design knowledge could be strengthened",
    "Consider practicing behavioral interview questions",
    "Work on conciseness in technical explanations",
  ]

  const transcript = [
    {
      speaker: "AI Interviewer",
      time: "00:02",
      text: "Hello! Thank you for joining today. Can you start by telling me about yourself and your background in frontend development?",
    },
    {
      speaker: "Candidate",
      time: "00:15",
      text: "Thank you for having me. I'm a frontend developer with 5 years of experience, primarily working with React and TypeScript. I've led several projects at my current company...",
    },
    {
      speaker: "AI Interviewer",
      time: "02:30",
      text: "That's great experience. Can you walk me through your approach to optimizing React component performance?",
    },
    {
      speaker: "Candidate",
      time: "02:45",
      text: "Absolutely. I typically start by identifying performance bottlenecks using React DevTools Profiler. Then I focus on memo optimization, useMemo and useCallback hooks...",
    },
  ]

  return (
    <div className="space-y-8">
      <InterviewResultsHeader
        interview={interview}
        duration={duration}
        onBackToDashboard={onBackToDashboard}
      />

      <OverallScoreCard
        overallScore={overallScore}
        duration={duration}
      />

      <InterviewTabs
        scores={scores}
        strengths={strengths}
        improvements={improvements}
        transcript={transcript}
      />
    </div>
  )
}

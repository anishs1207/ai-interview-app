'use client';

import { useState, useEffect } from "react";
import {
  AISidebar,
  VideoCallMainArea,
  VideoCallTopBar,
  QuestionDisplay,
} from "../(interview)"

interface VideoCallInterfaceProps {
  interview: {
    candidate?: string;
    duration?: number;
  };
  onEndInterview: () => void;
}

export function VideoCallInterface({ interview, onEndInterview }: VideoCallInterfaceProps) {
  const [mock, setMock] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const totalQuestions = 8;
  const duration = 5;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const progress = (timeElapsed / (duration * 60)) * 100;

  return (
    <>
      <div className="min-h-screen bg-gray-800 text-gray-800 flex flex-col">
        <VideoCallTopBar
          timeElapsed={timeElapsed}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          progress={progress}
        />

        <VideoCallMainArea
          candidateName={interview.candidate}
          onEndInterview={onEndInterview}
        />
        {/* 
      {mock && <AISidebar
        interview={{ duration }}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />} */}

      </div>

      <QuestionDisplay
        question="Can you walk me through your approach to optimizing React component performance?"
        tag="Technical"
        expectedTime="3–5 mins"
      />
    </>

  );
}

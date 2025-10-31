'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import {
  CandidateTabsContent,
  CreateInterviewForm,
  InterviewTabsContent,
} from '../(recruiter)';

interface Interview {
  id: string;
  theme: 'TECH' | 'BEHAVE';
  positionTitle: string;
  active: boolean;
  InterviewerPrompt: string;
  InterviewerFirstMessage: string;
  maxDurationInMinutes: number;
  vapiAssistantId: string;
  QuestionsToAsk: string[];
  userId: string;

  // Optional UI-only fields
  candidate?: string;
  date?: string;
  time?: string;
  status?: string;
  aiScore?: number;
}

interface RecruiterDashboardProps {
  onStartInterview: (interview: Interview) => void;
}

export function RecruiterDashboard({ onStartInterview }: RecruiterDashboardProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    const demoInterviews: Interview[] = [
      {
        id: '1',
        theme: 'TECH',
        positionTitle: 'Senior Frontend Developer',
        active: true,
        InterviewerPrompt: 'Ask about system design',
        InterviewerFirstMessage: 'Welcome!',
        maxDurationInMinutes: 60,
        vapiAssistantId: 'asst_123',
        QuestionsToAsk: ['What is React?', 'Explain hooks'],
        userId: 'recruiter-1',

        // UI display data
        // candidate: 'Sarah Johnson',
        date: '2024-01-15',
        time: '2:00 PM',
        status: 'scheduled',
      },
      {
        id: '2',
        theme: 'BEHAVE',
        positionTitle: 'Product Manager',
        active: false,
        InterviewerPrompt: 'Behavioral fit questions',
        InterviewerFirstMessage: 'Hello!',
        maxDurationInMinutes: 45,
        vapiAssistantId: 'asst_456',
        QuestionsToAsk: ['Tell me a challenge...', 'Working in a team?'],
        userId: 'recruiter-1',

        candidate: 'Michael Chen',
        date: '2024-01-14',
        time: '10:00 AM',
        status: 'completed',
        aiScore: 8.5,
      },
      {
        id: '3',
        theme: 'TECH',
        positionTitle: 'Data Scientist',
        active: true,
        InterviewerPrompt: 'Statistical modeling',
        InterviewerFirstMessage: 'Hi!',
        maxDurationInMinutes: 90,
        vapiAssistantId: 'asst_789',
        QuestionsToAsk: ['Explain regression', 'What is overfitting?'],
        userId: 'recruiter-1',

        candidate: 'Emily Rodriguez',
        date: '2024-01-16',
        time: '3:30 PM',
        status: 'in-progress',
      },
    ];

    setInterviews(demoInterviews);
  }, []);

  return (
    <div className="space-y-8">
      <Tabs defaultValue="interviews" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="candidates">Candidates Analysis</TabsTrigger>
          </TabsList>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Interview</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="mt-10 mb-10">
            <DialogHeader>
              <DialogTitle>Create New Interview</DialogTitle>
              <DialogDescription>
                Set up an AI-powered interview for your candidate
              </DialogDescription>
            </DialogHeader>
            <CreateInterviewForm onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>

        <TabsContent value="interviews" className="space-y-6">
          <InterviewTabsContent
            interviews={interviews}
            onStartInterview={onStartInterview}
          />
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6">
          <CandidateTabsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

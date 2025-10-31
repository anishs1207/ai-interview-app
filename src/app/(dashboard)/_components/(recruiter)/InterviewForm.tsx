'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, Minus } from 'lucide-react';
import axios from "axios";
import { interviewSchema } from '@/validations/createInterviewSchema';

export function CreateInterviewForm({ onClose }: { onClose: () => void }) {
    const [questions, setQuestions] = useState<string[]>(['']);
    const [positionTitle, setPositionTitle] = useState('');
    const [isActive, setIsActive] = useState('');
    const [interviewTheme, setInterviewTheme] = useState('');
    const [duration, setDuration] = useState('');
    const [startMessage, setStartMessage] = useState('');
    const [prompt, setPrompt] = useState('');
    const [interviewerNature, setInterviewerNature] = useState('');

    const addQuestion = () => setQuestions([...questions, '']);
    const removeQuestion = (index: number) =>
        setQuestions(questions.filter((_, i) => i !== index));
    const updateQuestion = (index: number, value: string) => {
        const updated = [...questions];
        updated[index] = value;
        setQuestions(updated);
    };

    const generateQuestions = () => {
        const aiQuestions = [
            'What are the key features of React?',
            'Explain useEffect and its use cases.',
            'How would you optimize a large React application?',
        ];
        setQuestions(aiQuestions);
    };

    // id for the recruiter
    const userId = "13131";

    const handleSubmit = async () => {
        const payload = {
            positionTitle,
            isActive,
            interviewTheme,
            duration,
            prompt,
            startMessage,
            interviewerNature,
            questions,
            userId
        }

        // const result = interviewSchema.safeParse(payload);

        // if (!result.success) {
        //     console.error('Validation failed', result.error.format());
        //     return;
        // }

        try {
            const response = await axios.post('/api/create-interview', payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.success) {
                console.log('interview created', response.data.interview);
            } else {
                console.error('Intyerview')
            }

        } catch (error) {
            console.error('❌ API Error:', error);
        }
    }

    return (
        <div className="max-w-screen-md w-full h-[90vh] overflow-y-auto px-4 p-10">
            <form className="space-y-6 max-w-screen-md mx-auto">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="title">Position Title</Label>
                        <Input
                            id="title"
                            value={positionTitle}
                            onChange={(e) => setPositionTitle(e.target.value)}
                            placeholder="Senior Frontend Developer"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="active">Active</Label>
                        <Select value={isActive} onValueChange={setIsActive}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">True</SelectItem>
                                <SelectItem value="false">False</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="type">Interview Theme</Label>
                        <Select value={interviewTheme} onValueChange={setInterviewTheme}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TECH">Technical</SelectItem>
                                <SelectItem value="BEHAVE">Behavioral</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="duration">Duration</Label>
                        <Select value={duration} onValueChange={setDuration}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5 minutes</SelectItem>
                                <SelectItem value="10">10 minutes</SelectItem>
                                <SelectItem value="15">15 minutes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Textareas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="start-message">Starting Message</Label>
                        <Textarea
                            id="start-message"
                            value={startMessage}
                            onChange={(e) => setStartMessage(e.target.value)}
                            placeholder="Hi there, Welcome to this Frontend React Interview"
                            rows={3}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="prompt">Prompt</Label>
                        <Textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Paste job description to help AI generate questions"
                            rows={3}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="nature">Interviewer Nature</Label>
                    <Textarea
                        id="nature"
                        value={interviewerNature}
                        onChange={(e) => setInterviewerNature(e.target.value)}
                        placeholder="A Nice, Experienced Senior Frontend Dev, who is encouraging"
                        rows={3}
                    />
                </div>

                {/* Questions Section */}
                <div className="space-y-2">
                    <Label>Questions to Ask</Label>
                    <div className="space-y-2">
                        {questions.map((question, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input
                                    value={question}
                                    onChange={(e) => updateQuestion(index, e.target.value)}
                                    placeholder={`Question ${index + 1}`}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeQuestion(index)}
                                    disabled={questions.length === 1}
                                >
                                    <Minus className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                        <div className="flex gap-2">
                            <Button className="w-full" type="button" variant="outline" onClick={addQuestion}>
                                <Plus className="w-4 h-4 mr-1" />
                                Add Question
                            </Button>
                        </div>
                        <Button className="w-full" type="button" onClick={generateQuestions}>
                            ✨ Generate with AI
                        </Button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Create Interview
                    </Button>
                </div>
            </form>
        </div>
    );
}

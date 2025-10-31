'use client';

import React from "react";
import {
    Users, UserCheck, Video, ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

type ViewMode = "recruiter" | "interviewee" | "settings" | "video-call" | "results" | "ai-insights" | "marketplace" | "blockchain" | "analytics";

interface NavbarProps {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ viewMode, setViewMode }) => {
    const viewOptions = [
        { mode: "recruiter", label: "Recruiter", icon: <Users className="w-4 h-4 mr-2" /> },
        { mode: "interviewee", label: "Interviewee", icon: <UserCheck className="w-4 h-4 mr-2" /> },
    ];

    return (
        <header className="bg-gray-50 backdrop-blur-xl border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                InterviewAI
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        {viewMode !== "video-call" && viewMode !== "results" && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="text-sm flex items-center">
                                        <span className="mr-2">{viewOptions.find(v => v.mode === viewMode)?.label}</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {viewOptions.map(({ mode, label, icon }) => (
                                        <DropdownMenuItem key={mode} onClick={() => setViewMode(mode as ViewMode)}>
                                            {icon}
                                            {label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="cursor-pointer flex items-center space-x-2 hover:bg-slate-100/60">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">AS</AvatarFallback>
                                    </Avatar>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-medium">Anish Sabharwal</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem className="cursor-pointer text-red-600">Sign Out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

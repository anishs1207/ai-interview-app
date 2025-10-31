'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Mic, MicOff, VideoOff, PhoneOff, Users, Brain
} from "lucide-react";
import Vapi from '@vapi-ai/web';

interface VideoCallMainAreaProps {
    candidateName?: string;
    onEndInterview: () => void;
}

// on joining a new intevriwer => call the baclend api to get the assjstanrid of the intervie =w and then start it here

export default function VideoCallMainArea({
    candidateName = "You",
    onEndInterview,
}: VideoCallMainAreaProps) {
    const [isMuted, setIsMuted] = useState(true);
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY!;

    useEffect(() => {
        const vapiInstance = new Vapi(apiKey);
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnected(true);
            vapiInstance.setMuted(true);
            setIsMuted(true);
        });

        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsSpeaking(false);
        });

        vapiInstance.on("speech-start", () => setIsSpeaking(true));
        vapiInstance.on("speech-end", () => setIsSpeaking(false));

        vapiInstance.on("message", (message) => {
            if (message.type === "transcript") {
                console.log(`[${message.role.toUpperCase()}]: ${message.transcript}`);
            }
        });

        vapiInstance.on("error", (err) => console.error("Vapi error", err));

        (async () => {
            const res = await fetch("/api/create-assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ candidateName })
            });
            const data = await res.json();

            if (data.assistantId) {
                vapiInstance.start(data.assistantId);
            } else {
                console.error("Failed to create assistant.");
            }
        })();

        // Cleanup on unmount
        return () => {
            vapiInstance.stop();
        };
    }, [apiKey, candidateName]);

    const endInterview = () => {
        if (vapi) vapi.stop();
        onEndInterview();
    };

    return (
        <div className="flex flex-col flex-1 overflow-auto px-6 py-6 space-y-6">
            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {/* AI Interviewer */}
                <Card className="rounded-xl shadow-md overflow-hidden">
                    <CardContent className="p-0 h-full">
                        <div className="h-full bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col justify-center items-center relative">
                            <div className="w-24 h-24 bg-white shadow-md rounded-full flex items-center justify-center mb-4">
                                <Brain className="w-12 h-12 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold">AI Interviewer</h3>
                            <p className="text-gray-600">Sarah AI</p>
                            <Badge className={`absolute top-4 left-4 text-white ${isSpeaking ? "bg-green-500" : "bg-gray-400"}`}>
                                {isSpeaking ? "Speaking" : "Listening"}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Candidate */}
                <Card className="rounded-xl shadow-md overflow-hidden">
                    <CardContent className="p-0 h-full">
                        <div className="h-full flex justify-center items-center bg-gray-100 relative">
                            {isVideoOff ? (
                                <div className="text-center">
                                    <VideoOff className="w-16 h-16 text-gray-400 mb-2 mx-auto" />
                                    <p className="text-gray-500">Camera is off</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                                        <Users className="w-12 h-12 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold">{candidateName}</h3>
                                </div>
                            )}
                            <Badge className={`absolute top-4 left-4 text-xs ${isMuted ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                                {isMuted ? "Muted" : "Unmuted"}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Controls */}
            <div className="w-full bg-white border border-gray-200 shadow-lg rounded-2xl px-4 py-2 flex items-center space-x-3 flex-wrap justify-center">
                <Button
                    size="icon"
                    onClick={() => {
                        if (vapi) {
                            vapi.setMuted(!isMuted);
                        }
                        setIsMuted(prev => !prev);
                    }}
                    className={`w-12 h-12 rounded-full ${isMuted
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 hover:brightness-110"
                        } text-white`}
                >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>

                <Button
                    variant="destructive"
                    onClick={endInterview}
                    className="flex items-center space-x-2 px-6 w-30 h-12 rounded-full"
                >
                    <PhoneOff className="w-4 h-4" />
                    <span className="text-sm">End</span>
                </Button>
            </div>
        </div>
    );
}

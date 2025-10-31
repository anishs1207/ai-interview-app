'use client';

import React, { useEffect, useState } from 'react';
import {
    Mic, MicOff, Video, VideoOff,
    Volume2, VolumeX, PhoneOff, Settings, Users, Clock
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Vapi from '@vapi-ai/web';

interface MeetInterfaceProps {
    username?: string;
    onLeave: () => void;
    duration?: number;
}

interface VapiWidgetProps {
    apiKey: string;
    assistantId: string;
    config?: Record<string, unknown>;
}

const VapiWidget: React.FC<VapiWidgetProps> = ({
    apiKey,
    assistantId,
    config = {}
}) => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<Array<{ role: string, text: string }>>([]);

    useEffect(() => {
        const vapiInstance = new Vapi(apiKey);
        setVapi(vapiInstance);

        // Event listeners
        vapiInstance.on('call-start', () => {
            console.log('Call started');
            setIsConnected(true);
        });

        vapiInstance.on('call-end', () => {
            console.log('Call ended');
            setIsConnected(false);
            setIsSpeaking(false);
        });

        vapiInstance.on('speech-start', () => {
            console.log('Assistant started speaking');
            setIsSpeaking(true);
        });

        vapiInstance.on('speech-end', () => {
            console.log('Assistant stopped speaking');
            setIsSpeaking(false);
        });

        vapiInstance.on('message', (message) => {
            if (message.type === 'transcript') {
                setTranscript(prev => [...prev, {
                    role: message.role,
                    text: message.transcript
                }]);
            }
        });

        vapiInstance.on('error', (error) => {
            console.error('Vapi error:', error);
        });

        return () => {
            vapiInstance?.stop();
        };
    }, [apiKey]);

    const startCall = () => {
        if (vapi) {
            vapi.start(assistantId);
        }
    };

    const endCall = () => {
        if (vapi) {
            vapi.stop();
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000,
            fontFamily: 'Arial, sans-serif'
        }}>
            {!isConnected ? (
                <button
                    onClick={startCall}
                    style={{
                        background: '#12A594',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '16px 24px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(18, 165, 148, 0.3)',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(18, 165, 148, 0.4)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 165, 148, 0.3)';
                    }}
                >
                    🎤 Talk to Assistant
                </button>
            ) : (
                <div style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '20px',
                    width: '320px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    border: '1px solid #e1e5e9'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <div style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: isSpeaking ? '#ff4444' : '#12A594',
                                animation: isSpeaking ? 'pulse 1s infinite' : 'none'
                            }}></div>
                            <span style={{ fontWeight: 'bold', color: '#333' }}>
                                {isSpeaking ? 'Assistant Speaking...' : 'Listening...'}
                            </span>
                        </div>
                        <button
                            onClick={endCall}
                            style={{
                                background: '#ff4444',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '6px 12px',
                                fontSize: '12px',
                                cursor: 'pointer'
                            }}
                        >
                            End Call
                        </button>
                    </div>

                    <div style={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        marginBottom: '12px',
                        padding: '8px',
                        background: '#f8f9fa',
                        borderRadius: '8px'
                    }}>
                        {transcript.length === 0 ? (
                            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                                Conversation will appear here...
                            </p>
                        ) : (
                            transcript.map((msg, i) => (
                                <div
                                    key={i}
                                    style={{
                                        marginBottom: '8px',
                                        textAlign: msg.role === 'user' ? 'right' : 'left'
                                    }}
                                >
                                    <span style={{
                                        background: msg.role === 'user' ? '#12A594' : '#333',
                                        color: '#fff',
                                        padding: '8px 12px',
                                        borderRadius: '12px',
                                        display: 'inline-block',
                                        fontSize: '14px',
                                        maxWidth: '80%'
                                    }}>
                                        {msg.text}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
        </div>
    );
};


const MeetInterface: React.FC<MeetInterfaceProps> = ({ username = 'You', onLeave, duration = 60 }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isSpeakerOff, setIsSpeakerOff] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };



    const progress = (timeElapsed / (duration * 60)) * 100;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
            {/* Header */}
            {/* <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-700">Recording</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{formatTime(timeElapsed)}</span>
                    </div>
                </div>
                <Badge className="bg-green-100 text-green-700 text-xs">Live</Badge>
            </div>

            {/* Main Content */}
            {/* <div className="flex-1 p-6 grid grid-cols-2 gap-4">
                {/* User 1 (Other Participant) */}
            {/* <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex flex-col items-center justify-center relative shadow-md">
                    <div className="w-24 h-24 bg-white shadow rounded-full flex items-center justify-center mb-4">
                        <Users className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Teammate</h3>
                    <Badge className="absolute top-4 left-4 bg-green-500 text-white">Speaking</Badge>
                </div> */}

            {/* User 2 (You) */}
            {/* <div className="bg-gray-100 rounded-xl flex flex-col items-center justify-center relative shadow-md">
                    {isVideoOff ? (
                        <div className="text-center">
                            <VideoOff className="w-16 h-16 text-gray-400 mb-2" />
                            <p className="text-gray-500">Camera is off</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                                <Users className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold">{username}</h3>
                        </>
                    )}
                    <Badge
                        className={`absolute top-4 left-4 text-xs ${isMuted ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                            }`}
                    >
                        {isMuted ? 'Muted' : 'Unmuted'}
                    </Badge>
                </div>
            </div>  */}

            {/* Controls */}
            {/* <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-full px-6 py-3 flex items-center space-x-4 z-50">
                <Button
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                <Button
                    size="icon"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                    {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </Button>
                <Button
                    size="icon"
                    onClick={() => setIsSpeakerOff(!isSpeakerOff)}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                    {isSpeakerOff ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                <Button size="icon" className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300">
                    <Settings className="w-5 h-5 text-gray-600" />
                </Button>
                <Button
                    variant="destructive"
                    onClick={onLeave}
                    className="flex items-center space-x-2 px-4 h-12 rounded-full"
                >
                    <PhoneOff className="w-4 h-4" />
                    <span className="text-sm">Leave</span>
                </Button>
            </div> */}

            {/* Voice Assistant Widget */}
            <VapiWidget
                apiKey={process.env.NEXT_PUBLIC_VAPI_API_KEY!}
                assistantId="your-assistant-id"
            />

        </div>
    );
};

export default MeetInterface;

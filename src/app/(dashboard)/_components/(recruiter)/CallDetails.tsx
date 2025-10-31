'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

type Participant = {
    id: string;
    startedAt: string | null;
    endedAt: string | null;
    userId: string | null;
    type: string;
    callId: string;
};

type Call = {
    id: string;
    status: string;
    startedAt: string | null;
    endedAt: string | null;
    createdAt: string;
    updatedAt: string;
    assistantId: string | null;
    participants: Participant[];
    transcript?: string;
    summary?: string;
    stereoRecordingUrl?: string;
    analysis?: {
        summary?: string;
    };
};

const truncateText = (text: string, length = 100) =>
    text.length > length ? text.slice(0, length) + '...' : text;

const DashboardPage: React.FC = () => {
    const [data, setData] = useState<Call[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [expanded, setExpanded] = useState<
        Record<string, { transcript: boolean; summary: boolean; analysisSummary: boolean }>
    >({});

    useEffect(() => {
        const fetchCallInfo = async () => {
            try {
                const response = await axios.get('/api/call-info');
                const calls = response.data;
                setData(calls);

                const initialExpanded: typeof expanded = {};
                calls.forEach((call: Call) => {
                    initialExpanded[call.id] = {
                        transcript: false,
                        summary: false,
                        analysisSummary: false,
                    };
                });
                setExpanded(initialExpanded);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch call info');
            } finally {
                setLoading(false);
            }
        };

        fetchCallInfo();
    }, []);

    const toggleField = (callId: string, field: 'transcript' | 'summary' | 'analysisSummary') => {
        setExpanded((prev) => ({
            ...prev,
            [callId]: {
                ...prev[callId],
                [field]: !prev[callId][field],
            },
        }));
    };

    function formatDate(dateString: string | null): string {
        if (!dateString) return '—';

        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // 0 becomes 12

        return `${day}/${month}/${year} (${hours}:${minutes} ${ampm})`;
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete('/api/call-info', {
                headers: {
                    'callId': id,
                },
            });

            if (response.status === 200) {
                console.log('Call deleted successfully:', response.data);
                // Optional: refresh data or remove from UI list here
            } else {
                console.warn('Call deletion returned non-200 status:', response.status);
            }
        } catch (err) {
            console.error('Failed to delete call:', err);
        }
    };




    if (loading) return <p className="p-6 text-muted-foreground">Loading call data...</p>;
    if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

    return (
        <div className="p-8 space-y-6">


            <Card className="shadow-md border border-gray-200">
                <CardContent className="p-0">
                    <ScrollArea className="w-full">
                        <Table className="text-sm">
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    {/* <TableHead className="px-4 py-3">Call ID</TableHead> */}
                                    <TableHead className="px-4 py-3">Assistant ID</TableHead>
                                    <TableHead className="px-4 py-3">Status</TableHead>
                                    <TableHead className="px-4 py-3">Started</TableHead>
                                    <TableHead className="px-4 py-3">Ended</TableHead>
                                    <TableHead className="px-4 py-3">Transcript</TableHead>
                                    <TableHead className="px-4 py-3">Summary</TableHead>
                                    <TableHead className="px-4 py-3">Recording</TableHead>
                                    <TableHead className="px-4 py-3">Delete</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {data.map((call, index) => {
                                    const isExpanded = expanded[call.id] || {
                                        transcript: false,
                                        summary: false,
                                        analysisSummary: false,
                                    };

                                    return (
                                        <TableRow
                                            key={call.id}
                                            className={`align-top ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition-colors hover:bg-muted/20`}
                                        >
                                            {/* <TableCell className="px-4 py-3 font-mono text-xs">{call.id}</TableCell> */}
                                            <TableCell className="px-4 py-3">{call.assistantId || '—'}</TableCell>
                                            <TableCell className="px-4 py-3 capitalize">{call.status}</TableCell>
                                            <TableCell className="px-4 py-3 text-muted-foreground">{formatDate(call.startedAt)}</TableCell>
                                            <TableCell className="px-4 py-3 text-muted-foreground">{formatDate(call.endedAt)}</TableCell>


                                            <TableCell className="px-4 py-3 max-w-[250px] whitespace-pre-wrap">
                                                {isExpanded.transcript ? call.transcript : truncateText(call.transcript || '')}
                                                {call.transcript && call.transcript.length > 100 && (
                                                    <Button variant="link" size="sm" onClick={() => toggleField(call.id, 'transcript')}>
                                                        {isExpanded.transcript ? 'Read less' : 'Read more'}
                                                    </Button>
                                                )}
                                            </TableCell>

                                            <TableCell className="px-4 py-3 max-w-[250px] whitespace-pre-wrap">
                                                {isExpanded.summary ? call.summary : truncateText(call.summary || '')}
                                                {call.summary && call.summary.length > 100 && (
                                                    <Button variant="link" size="sm" onClick={() => toggleField(call.id, 'summary')}>
                                                        {isExpanded.summary ? 'Read less' : 'Read more'}
                                                    </Button>
                                                )}
                                            </TableCell>

                                            <TableCell className="px-4 py-3">
                                                {call.stereoRecordingUrl ? (
                                                    <a
                                                        href={call.stereoRecordingUrl}
                                                        className="text-blue-600 underline text-sm"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Recording
                                                    </a>
                                                ) : (
                                                    '—'
                                                )}
                                            </TableCell>

                                            <TableCell className="px-4 py-3">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(call.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardPage;

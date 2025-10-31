'use client';

import React from 'react';
import { Zap } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 backdrop-blur-xl border-t border-slate-200/60 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <p className="text-sm text-slate-600">
                            © 2024 InterviewAI Pro. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <span>Status: All systems operational</span>
                            <div className="flex items-center space-x-1">
                                <Zap className="w-4 h-4 text-green-500" />
                                <span>99.9% uptime</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>API v2.1</span>
                        <span>•</span>
                        <span>Region: US-East</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

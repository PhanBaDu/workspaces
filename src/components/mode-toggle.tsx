'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Card, CardContent } from '@/components/ui/card';

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex justify-between w-full gap-1 cursor-pointer">
            <Card
                onClick={() => setTheme('light')}
                className="shadow-none rounded-md flex-1 bg-gray-100 p-0 pt-3 pl-3 overflow-hidden"
            >
                <CardContent className="bg-white text-black rounded-tl-md pt-1.5 pl-1.5 relative">
                    <span className="text-sm font-medium">Aa</span>

                    <div className="absolute bottom-1 left-2/4 -translate-x-2/4 w-4 h-4 rounded-full border border-gray-300">
                        {theme === 'light' && (
                            <Check
                                size={15}
                                className="text-primary"
                                strokeWidth={4}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card
                onClick={() => setTheme('dark')}
                className="shadow-none rounded-md flex-1 bg-gray-100 p-0 pt-3 pl-3 overflow-hidden"
            >
                <CardContent className="bg-black/90 text-white rounded-tl-md pt-1.5 pl-1.5 relative">
                    <span className="text-sm font-medium">Aa</span>
                    <div className="absolute bottom-1 left-2/4 -translate-x-2/4 w-4 h-4 rounded-full border border-gray-300">
                        {theme === 'dark' && (
                            <Check
                                size={15}
                                className="text-primary"
                                strokeWidth={4}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
            <Card
                onClick={() => setTheme('system')}
                className="shadow-none rounded-md flex-1 bg-gray-100 p-0 pt-3 pl-3 overflow-hidden"
            >
                <CardContent className="bg-black/90 text-white rounded-tl-md pt-1.5 pl-1.5 relative">
                    <span className="text-sm font-medium">Aa</span>
                    <div className="absolute bottom-1 z-10 left-2/4 -translate-x-2/4 w-4 h-4 rounded-full border border-gray-300">
                        {theme === 'system' && (
                            <Check
                                size={15}
                                className="text-primary"
                                strokeWidth={4}
                            />
                        )}
                    </div>
                    <div className="absolute top-0 right-0 bg-white w-2/4 h-full"></div>
                </CardContent>
            </Card>
        </div>
    );
}

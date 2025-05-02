'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { vi, enUS } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useLocale } from 'next-intl';

interface DatePickerProps {
    value: Date | undefined;
    onChange: (value: Date) => void;
    className?: string;
    placeholder?: string;
}

export const DatePicker = ({
    value,
    onChange,
    className,
    placeholder = 'Select date',
}: DatePickerProps) => {
    const locale = useLocale();
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    size={'lg'}
                    className={cn(
                        'w-full justify-start text-left font-normal px-3 capitalize',
                        !value && 'text-muted-foreground',
                        className,
                    )}
                >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {value ? (
                        format(value, 'PPP', {
                            locale: locale === 'vi' ? vi : enUS,
                        })
                    ) : (
                        <span className="normal-case">{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => onChange(date as Date)}
                    initialFocus
                    locale={locale === 'vi' ? vi : enUS}
                />
            </PopoverContent>
        </Popover>
    );
};

'use client';
import { Task } from '@/features/tasks/types';
import {
    format,
    getDay,
    parse,
    startOfWeek,
    addMonths,
    subMonths,
} from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './data-calendar.css';
import EventCard from '@/features/tasks/components/event-card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useLocale } from 'next-intl';

const locales = {
    'en-US': enUS,
    vi: vi,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface DataCanlendarProps {
    data: Task[];
}

interface CustomToolbarProps {
    date: Date;
    onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void;
}

const CustomToobar = ({ date, onNavigate }: CustomToolbarProps) => {
    const locale = useLocale();
    const formatted = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);

    return (
        <div className="flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start">
            <Button
                onClick={() => onNavigate('PREV')}
                variant={'secondary'}
                size={'icon'}
                className="flex items-center"
            >
                <ChevronLeftIcon className="size-4" />
            </Button>
            <div className="flex items-center border border-input rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto">
                <CalendarIcon className="size-4 mr-2" />
                <p className="text-sm">
                    {locale === 'vi'
                        ? `${formatted}`
                        : `${format(date, 'MMMM yyyy')} `}
                </p>
            </div>
            <Button
                onClick={() => onNavigate('NEXT')}
                variant={'secondary'}
                size={'icon'}
            >
                <ChevronRightIcon className="size-4" />
            </Button>
        </div>
    );
};

export default function DataCanlendar({ data }: DataCanlendarProps) {
    const [value, setValue] = useState(
        data.length > 0 ? new Date(data[0].dueDate) : new Date(),
    );
    const locale = useLocale();
    const events = data.map((task) => ({
        project: task.project,
        title: task.name,
        start: new Date(task.dueDate),
        end: new Date(task.dueDate),
        assignee: task.assignee,
        status: task.status,
        id: task.$id,
    }));

    const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
        if (action === 'PREV') {
            setValue(subMonths(value, 1));
        } else if (action === 'NEXT') {
            setValue(addMonths(value, 1));
        } else if (action === 'TODAY') {
            setValue(new Date());
        }

        return (
            <Calendar
                localizer={localizer}
                date={value}
                events={events}
                views={['month']}
                defaultView="month"
                toolbar
                showAllEvents
                className="h-full"
                max={
                    new Date(
                        new Date().setFullYear(new Date().getFullYear() + 1),
                    )
                }
                formats={{
                    weekdayFormat: (date, culture, localizer) =>
                        localizer?.format(date, 'EEE', culture) ?? '',
                }}
            />
        );
    };

    return (
        <Calendar
            localizer={localizer}
            date={value}
            events={events}
            views={['month']}
            defaultView="month"
            toolbar
            culture={locale}
            showAllEvents
            className="h-full"
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
            formats={{
                weekdayFormat: (date, culture, localizer) =>
                    localizer?.format(date, 'EEE', culture) ?? '',
            }}
            components={{
                eventWrapper: ({ event }) => (
                    <EventCard
                        id={event.id}
                        title={event.title}
                        assignee={event.assignee}
                        project={event.project}
                        status={event.status}
                    />
                ),
                toolbar: () => (
                    <CustomToobar date={value} onNavigate={handleNavigate} />
                ),
            }}
        />
    );
}

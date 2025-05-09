import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

interface AnalyticsCardProps {
    title: string;
    value?: number;
    variant: 'up' | 'down';
    increaseValue: number;
}

export default function AnalyticsCard({
    increaseValue,
    title,
    variant,
    value,
}: AnalyticsCardProps) {
    const iconColor = variant === 'up' ? 'text-emerald-500' : 'text-red-500';
    const increaseValueColor =
        variant === 'up' ? 'text-emerald-500' : 'text-red-500';
    const Icon = variant === 'up' ? FaCaretUp : FaCaretDown;

    return (
        <Card className="shadow-none w-full bg-background border-none">
            <CardHeader>
                <div className="flex items-center gap-x-2.5">
                    <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
                        <span className="truncate text-sm">{title}</span>
                    </CardDescription>
                    <div className="flex items-center gap-x-1">
                        <Icon className={cn(iconColor, 'size- 4')} />
                        <span
                            className={cn(
                                increaseValueColor,
                                'truncate text-base font-medium',
                            )}
                        >
                            {increaseValue}
                        </span>
                    </div>
                </div>
                <CardTitle className="font-semibold">{value}</CardTitle>
            </CardHeader>
        </Card>
    );
}

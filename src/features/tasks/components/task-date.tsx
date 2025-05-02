import { differenceInDays, format } from 'date-fns';

import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

interface TaskDateProps {
    value: string;
    className?: string;
}

export const TaskDate = ({ value, className }: TaskDateProps) => {
    const locale = useLocale();
    const today = new Date();
    const endDate = new Date(value);
    const diffInDays = differenceInDays(endDate, today);

    let textColor = 'text-muted-foreground';
    if (diffInDays <= 3) {
        textColor = 'text-red-500';
    } else if (diffInDays <= 7) {
        textColor = 'text-orange-500';
    } else if (diffInDays <= 14) {
        textColor = 'text-yellow-500';
    }

    const formatted = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(endDate);

    return (
        <div className={textColor}>
            <span className={cn('truncate', className)}>
                {locale === 'vi' ? `${formatted}` : `${format(value, 'PPP')}`}
            </span>
        </div>
    );
};

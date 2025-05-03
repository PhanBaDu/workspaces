import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PageErrorProps {
    message?: string;
}

export default function PageError({
    message = 'Something_went_wrong',
}: PageErrorProps) {
    const t = useTranslations('PageError.Client');
    if (message === 'Something_went_wrong') {
        message = t(`${message}`);
    }
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <AlertTriangle className="size-6 text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-muted-foreground">
                {message}
            </p>
        </div>
    );
}

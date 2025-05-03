'use client';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const ErrorPage = () => {
    const t = useTranslations('PageError.Client');
    return (
        <div className="h-screen flex gap-y-2 flex-col items-center justify-center">
            <AlertTriangle className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{t('title')}</p>
            <Button variant={'secondary'} size={'sm'}>
                <Link href={'/'}>{t('back')}</Link>
            </Button>
        </div>
    );
};

export default ErrorPage;

'use client';
import { MobileSideBar } from '@/components/mobile-sidebar';
import SetLocale from '@/components/set-locale';
import { UserButton } from '@/features/auth/components/user-button';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const t = useTranslations('Header');

    const defaultMap = {
        title: `${t('Client.home')}`,
        description: `${t('Client.home_desc')}`,
    };

    const pathnameMap = {
        tasks: {
            title: `${t('Client.tasks')}`,
            description: `${t('Client.tasks_desc')}`,
        },
        projects: {
            title: `${t('Client.projects')}`,
            description: `${t('Client.projects_desc')}`,
        },
    };

    const pathname = usePathname();
    const pathnameParts = pathname.split('/');
    const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;
    const { description, title } = pathnameMap[pathnameKey] || defaultMap;

    return (
        <nav className="flex items-center justify-between bg-card p-4 rounded-lg">
            <div className="lg:flex flex-col hidden">
                <h1 className="text-xl font-semibold uppercase">{title}</h1>
                <p className="text-muted-foreground text-sm">{description}</p>
            </div>
            <MobileSideBar />
            <div className="flex justify-between items-center gap-4">
                <SetLocale />
                <UserButton />
            </div>
        </nav>
    );
}

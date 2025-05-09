'use client';
import {
    CalendarCheck2,
    CheckCheck,
    LayoutGrid,
    SettingsIcon,
    UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useTranslations } from 'next-intl';

export default function Navigation() {
    const pathname = usePathname();
    const workspaceId = useWorkspaceId();
    const t = useTranslations('Navbar');

    const routes = [
        {
            label: `${t('Client.home')}`,
            href: '',
            icon: LayoutGrid,
            activeIcon: CheckCheck,
        },
        {
            label: `${t('Client.my_tasks')}`,
            href: '/tasks',
            icon: CalendarCheck2,
            activeIcon: CheckCheck,
        },
        {
            label: `${t('Client.settings')}`,
            href: '/settings',
            icon: SettingsIcon,
            activeIcon: CheckCheck,
        },
        {
            label: `${t('Client.members')}`,
            href: '/members',
            icon: UsersIcon,
            activeIcon: CheckCheck,
        },
    ];

    return (
        <ul className="flex flex-col">
            {routes.map((item) => {
                const fullHref = `/workspaces/${workspaceId}${item.href}`;
                const isActive = pathname === fullHref;
                const Icon = item.icon;
                const IconActive = item.activeIcon;

                return (
                    <Button
                        key={item.href}
                        asChild
                        variant={isActive ? 'primary' : 'ghost'}
                        className="flex justify-between items-center shadow-none duration-75"
                    >
                        <Link href={fullHref}>
                            <div className="flex items-center gap-2">
                                <Icon strokeWidth={2} />
                                <span className="mt-[2px] capitalize">
                                    {item.label}
                                </span>
                            </div>
                            {isActive && <IconActive />}
                        </Link>
                    </Button>
                );
            })}
        </ul>
    );
}

'use client';
import { CalendarCheck2, CheckCheck, LayoutDashboard, SettingsIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const routes = [
    {
        label: 'Home',
        href: '/',
        icon: LayoutDashboard,
        activeIcon: CheckCheck,
    },
    {
        label: 'My Tasks',
        href: '/tasks',
        icon: CalendarCheck2,
        activeIcon: CheckCheck,
    },
    {
        label: 'Settings',
        href: '/settings',
        icon: SettingsIcon,
        activeIcon: CheckCheck,
    },
    {
        label: 'Members',
        href: '/members',
        icon: UsersIcon,
        activeIcon: CheckCheck,
    },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <ul className="flex flex-col">
            {routes.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                const IconActive = item.activeIcon;

                return (
                    <Button
                        key={item.href}
                        asChild
                        variant={isActive ? 'primary' : 'ghost'}
                        className="hover:bg-primary hover:text-background flex justify-between items-center shadow-none duration-75"
                    >
                        <Link href={item.href}>
                            <div className="flex items-center gap-2">
                                <Icon strokeWidth={2} />
                                <span className="mt-[2px]">{item.label}</span>
                            </div>
                            {isActive && <IconActive />}
                        </Link>
                    </Button>
                );
            })}
        </ul>
    );
}

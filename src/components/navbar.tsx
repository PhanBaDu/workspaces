'use client';
import { MobileSideBar } from '@/components/mobile-sidebar';
import { UserButton } from '@/features/auth/components/user-button';
import { usePathname } from 'next/navigation';

const pathnameMap = {
    tasks: {
        title: 'My Tasks',
        description: 'Monitor all of your tasks here',
    },
    projects: {
        title: 'My Projects',
        description: 'Monitor all of your projects here',
    },
};

const defaultMap = {
    title: 'Home',
    description: 'Monitor all of your projects and tasks here',
};

export default function Navbar() {
    const pathname = usePathname();
    const pathnameParts = pathname.split('/');
    const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;
    const { description, title } = pathnameMap[pathnameKey] || defaultMap;

    return (
        <nav className="pt-4 px-6 flex items-center justify-between">
            <div className="lg:flex flex-col hidden">
                <h1 className="text-xl font-semibold uppercase">{title}</h1>
                <p className="text-muted-foreground text-sm">{description}</p>
            </div>
            <MobileSideBar />
            <UserButton />
        </nav>
    );
}

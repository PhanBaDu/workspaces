import { DashedSeparator } from '@/components/dashed-separator';
import Navigation from '@/components/navigation';
import { Projects } from '@/components/projects';
import SidebarLogo from '@/components/sidebar-logo';
import WorkspaceSwitcher from '@/components/workspace-switcher';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className="h-full border-r border-dashed border-r-primary p-4 w-full bg-background">
            <Link href={'/'}>
                <SidebarLogo />
            </Link>
            <DashedSeparator className="my-5" />
            <WorkspaceSwitcher />
            <DashedSeparator className="my-5" />
            <Navigation />
            <DashedSeparator className="my-5" />
            <Projects />
        </aside>
    );
}

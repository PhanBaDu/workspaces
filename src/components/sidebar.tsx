import { DashedSeparator } from '@/components/dashed-separator';
import Navigation from '@/components/navigation';
import { Projects } from '@/components/projects';
import SidebarLogo from '@/components/sidebar-logo';
import WorkspaceSwitcher from '@/components/workspace-switcher';
// import Admin from '@/features/admin/components/admin';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className="h-full border-r bg-muted p-4 w-full flex flex-col">
            <Link href={'/'}>
                <SidebarLogo />
            </Link>
            <DashedSeparator className="my-5" />
            <WorkspaceSwitcher />
            <DashedSeparator className="my-5" />
            <Navigation />
            <DashedSeparator className="my-5" />
            <Projects />
            {/* <Admin /> */}
        </aside>
    );
}

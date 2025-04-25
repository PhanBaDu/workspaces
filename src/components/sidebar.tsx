import { DashedSeparator } from '@/components/dashed-separator';
import Navigation from '@/components/navigation';
import { Projects } from '@/components/projects';
import WorkspaceSwitcher from '@/components/workspace-switcher';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className="h-full border-r bg-muted p-4 w-full">
            <Link href={'/'}>
                <div className="flex items-center">
                    <Image
                        src={'/logo.svg'}
                        height={152}
                        width={56}
                        alt="Logo Workspaces"
                        priority
                        style={{ height: '47px', width: '57px' }}
                    />
                    <h1 className="text-primary font-extrabold text-2xl mt-2 uppercase">
                        orkspaces
                    </h1>
                </div>
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

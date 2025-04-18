import { DashedSeparator } from '@/components/dashed-separator';
import Navigation from '@/components/navigation';
import WorkspaceSwitcher from '@/components/workspace-switcher';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href={'/'}>
                <div className="flex items-center">
                    <Image src={'/logo.svg'} height={152} width={56} alt="Logo Workspaces" />
                    <h1 className="text-primary font-extrabold text-2xl mt-2 uppercase">
                        orkspaces
                    </h1>
                </div>
            </Link>
            <DashedSeparator className="my-4" />
            <WorkspaceSwitcher />
            <DashedSeparator className="my-4" />
            <Navigation />
        </aside>
    );
}

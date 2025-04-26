'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function SidebarLogo() {
    const { theme } = useTheme();

    return (
        <div className="flex items-center">
            <Image
                src={theme === 'light' ? '/light-logo.svg' : '/dark-logo.svg'}
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
    );
}

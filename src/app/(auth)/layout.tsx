'use client';
import SidebarLogo from '@/components/sidebar-logo';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const pathname = usePathname();
    const isSignIn = pathname === '/sign-in';
    const t = useTranslations('AuthPage');

    return (
        <div className="bg-muted min-h-screen">
            <main className="mx-auto max-w-screen-2xl p-4 relative">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center">
                        <SidebarLogo />
                    </div>
                    <Button asChild>
                        <Link href={isSignIn ? '/sign-up' : '/sign-in'}>
                            {isSignIn
                                ? `${t('signIn.href')}`
                                : `${t('signUp.href')}`}
                        </Link>
                    </Button>
                </nav>
                <Image
                    className="hidden lg:block fixed -rotate-45 top-1/4 -translate-y-1/4 left-40 -translate-x-40"
                    src={'/background.png'}
                    alt="landing"
                    width={600}
                    height={600}
                />
                <div className="flex flex-col items-center justify-center pt-4 md:pt-14 ">
                    {children}
                </div>
                <Image
                    className="hidden lg:block fixed rotate-[20deg] top-1/4 -translate-y-1/4 right-40 translate-x-40"
                    src={'/background.png'}
                    alt="landing"
                    width={600}
                    height={600}
                />
            </main>
        </div>
    );
}

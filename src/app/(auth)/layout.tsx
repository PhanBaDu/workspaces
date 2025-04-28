'use client';
import SetLocale from '@/components/set-locale';
import SidebarLogo from '@/components/sidebar-logo';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
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
            <main className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center">
                        <SidebarLogo />
                    </div>
                    <div className="flex items-center gap-2">
                        <SetLocale />
                        <Button variant={'outline'} asChild>
                            <Link href={isSignIn ? '/sign-up' : '/sign-in'}>
                                {isSignIn
                                    ? `${t('signIn.href')}`
                                    : `${t('signUp.href')}`}
                            </Link>
                        </Button>
                    </div>
                </nav>
                <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
                    {children}
                </div>
            </main>
        </div>
    );
}

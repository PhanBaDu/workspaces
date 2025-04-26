'use client';
import SidebarLogo from '@/components/sidebar-logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const pathname = usePathname();
    const isSignIn = pathname === '/sign-in';
    return (
        <div className="bg-muted min-h-screen">
            <main className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center">
                        <SidebarLogo />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant={'outline'} asChild>
                            <Link href={isSignIn ? '/sign-up' : '/sign-in'}>
                                {isSignIn ? 'Sign Up' : 'Sign In'}
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

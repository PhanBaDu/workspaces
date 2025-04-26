'use client';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const pathname = usePathname();
    const { theme } = useTheme();
    const isSignIn = pathname === '/sign-in';

    return (
        <div className="bg-muted min-h-screen">
            <main className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Image
                            src={
                                theme === 'light'
                                    ? '/light-logo.svg'
                                    : '/dark-logo.svg'
                            }
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

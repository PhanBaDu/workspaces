import { UserButton } from '@/features/auth/components/user-button';
import Image from 'next/image';
import Link from 'next/link';

interface StandloneLayoutProps {
    children: React.ReactNode;
}

const StandloneLayout = ({ children }: StandloneLayoutProps) => {
    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <Link href={'/'} className="flex items-center">
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
                    </Link>
                    <UserButton />
                </nav>
                <div className="flex flex-col items-center justify-center py-4">{children}</div>
            </div>
        </main>
    );
};

export default StandloneLayout;

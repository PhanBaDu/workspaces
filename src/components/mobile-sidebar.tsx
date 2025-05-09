'use client';

import Sidebar from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const MobileSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant={'secondary'} className="lg:hidden">
                    <MenuIcon className="size-4 text-muted-foreground" />
                </Button>
            </SheetTrigger>
            <SheetContent
                side={'left'}
                className="p-0 border-none fixed top-0 left-0 bottom-0 z-50"
            >
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

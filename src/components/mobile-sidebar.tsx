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
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant={'secondary'} className="lg:hidden">
                    <MenuIcon className="size-4 text-muted-foreground" />
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'} className="p-0 border-none">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

'use client';
import { ArrowLeft } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { GroupSidebar } from '@/features/admin/components/group-sidebar';
import { items } from '@/features/admin/components/ultis';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function AppSidebar() {
    const t = useTranslations('System.Client');

    return (
        <Sidebar className="bg-card">
            <SidebarContent>
                <SidebarGroup>
                    <div className="flex items-center gap-1">
                        <SidebarGroupLabel className="text-2xl font-extrabold bg-gradient-to-r from-primary to-black bg-clip-text text-transparent">
                            ANALYTICS
                        </SidebarGroupLabel>
                    </div>

                    <SidebarGroupContent>
                        {items.map((items, index) => (
                            <GroupSidebar key={index} item={items} />
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button
                    className="text-sm w-full flex justify-between items-center"
                    variant={'primary'}
                    asChild
                >
                    <Link href={'/'}>
                        {t('out')}
                        <ArrowLeft />
                    </Link>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}

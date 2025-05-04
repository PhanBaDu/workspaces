'use client';
import { ChartNetwork } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { GroupSidebar } from '@/features/admin/components/group-sidebar';
import { items } from '@/features/admin/components/ultis';

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div className="flex items-center gap-1">
                        <SidebarGroupLabel className="text-2xl font-extrabold bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
                            ANALYTICS
                        </SidebarGroupLabel>
                        <ChartNetwork
                            className="text-green-500"
                            size={24}
                            strokeWidth={2.5}
                        />
                    </div>

                    <SidebarGroupContent>
                        {items.map((items, index) => (
                            <GroupSidebar key={index} item={items} />
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

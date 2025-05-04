'use client';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SidebarItem } from '@/features/admin/components/ultis';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface GroupSidebarProps {
    item: SidebarItem;
}

export function GroupSidebar({ item }: GroupSidebarProps) {
    const pathname = usePathname();
    return (
        <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                        <span className="text-sm text-muted-foreground animate-pulse">
                            {item.label}
                        </span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 text-primary" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem className="ml-2 pl-2 border-l border-dashed border-primary">
                                {item.items?.map((item, index) => (
                                    <SidebarMenuButton
                                        key={index}
                                        isActive={pathname === item.url}
                                        asChild
                                        className="text-xs flex justify-between items-center text-muted-foreground/80 animate-pulse"
                                    >
                                        <Link href={item.url}>
                                            {item.title}
                                            <item.icon />
                                        </Link>
                                    </SidebarMenuButton>
                                ))}
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    );
}

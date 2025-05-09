'use client';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MemberAvatar } from '@/features/members/components/members-avatar';
import { Member } from '@/features/members/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreVertical, SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export function useMemberColumns(): ColumnDef<Member>[] {
    const t = useTranslations('Member.Client');
    const router = useRouter();

    return [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('member_name')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const member = row.original;
                if (!member) return null;
                return (
                    <div className="flex items-center gap-x-2 text-sm font-medium">
                        <MemberAvatar className="size-6" name={member.name} />
                        <p className="line-clamp-1">{member.name}</p>
                    </div>
                );
            },
        },

        {
            id: 'actions',
            cell: ({ row }) => {
                const workspaceId = row.original.workspaceId;
                const onOpenMemberSettings = () => {
                    router.push(`/workspaces/${workspaceId}/members`);
                };
                return (
                    <div className="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant={'ghost'}
                                    className="size-8 p-0"
                                >
                                    <MoreVertical className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52">
                                <DropdownMenuItem
                                    onClick={onOpenMemberSettings}
                                    className="font-medium p-[10px] cursor-pointer flex items-center"
                                >
                                    <SquareArrowOutUpRight className="size-4 stroke-2" />
                                    {t('open')}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ];
}

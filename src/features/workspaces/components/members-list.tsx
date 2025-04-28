'use client';
import { DashedSeparator } from '@/components/dashed-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useDeleteMember } from '@/features/members/api/use-delete-member';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useUpdateMember } from '@/features/members/api/use-update-member';
import { MemberAvatar } from '@/features/members/components/members-avatar';
import { MemberRole } from '@/features/members/types';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useConfirm } from '@/hooks/use-confirm';
import { ArrowLeftIcon, MoreVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Fragment } from 'react';

export default function MembersList() {
    const workspaceId = useWorkspaceId();
    const t = useTranslations('MembersPage');
    const { data } = useGetMembers({ workspaceId });

    const [ConfirmDialog, confirm] = useConfirm(
        `${t('Client.remove_title')}`,
        `${t('Client.remove_desc')}`,
        'destructive',
    );

    const { mutate: updateMember, isPending: isUpdatingMember } =
        useUpdateMember();
    const { mutate: deleteMember, isPending: isDeletingMember } =
        useDeleteMember();

    const handleUpdateMember = (memberId: string, role: MemberRole) => {
        updateMember({
            json: { role },
            param: { memberId },
        });
    };

    const handleDeleteMember = async (memberId: string) => {
        const ok = await confirm();

        if (!ok) return;

        deleteMember(
            { param: { memberId } },
            {
                onSuccess: () => {
                    window.location.reload();
                },
            },
        );
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <ConfirmDialog />
            <CardHeader className="flex flex-row items-center justify-between gap-x-4 p-7 space-y-0">
                <Button asChild variant={'secondary'} size="sm">
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeftIcon />
                        {t('Client.back')}
                    </Link>
                </Button>
                <CardTitle className="text-lg font-bold uppercase">
                    {t('Client.title')}
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DashedSeparator />
            </div>
            <CardContent className="p-7">
                {data?.documents.map((member, index) => (
                    <Fragment key={member.$id}>
                        <div className="flex items-center gap-2">
                            <MemberAvatar
                                name={member.name}
                                className="size-10"
                                fallbackClassName="text-lg
                            "
                            />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">
                                    {member.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {member.email}
                                </p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="ml-auto"
                                        variant={'secondary'}
                                        size={'icon'}
                                    >
                                        <MoreVertical className="size-4 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end">
                                    <DropdownMenuItem
                                        className="font-medium cursor-pointer"
                                        onClick={() =>
                                            handleUpdateMember(
                                                member.$id,
                                                MemberRole.ADMIN,
                                            )
                                        }
                                        disabled={isUpdatingMember}
                                    >
                                        {t('Client.admin')}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="font-medium cursor-pointer"
                                        onClick={() =>
                                            handleUpdateMember(
                                                member.$id,
                                                MemberRole.MEMBER,
                                            )
                                        }
                                        disabled={isUpdatingMember}
                                    >
                                        {t('Client.member')}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="font-medium dark:text-red-500 text-destructive cursor-pointer focus:text-destructive"
                                        onClick={() =>
                                            handleDeleteMember(member.$id)
                                        }
                                        disabled={isDeletingMember}
                                    >
                                        {t('Client.remove')} {member.name}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {index < data.documents.length - 1 && (
                            <Separator className="my-2.5" />
                        )}
                    </Fragment>
                ))}
            </CardContent>
        </Card>
    );
}

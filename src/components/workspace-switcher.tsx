'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { WorkspaceAvatar } from '@/features/workspaces/components/workspace-avatar';
import { useCreateWorkspaceModal } from '@/features/workspaces/hooks/use-create-workspace-modal';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { GitBranchPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function WorkspaceSwitcher() {
    const workspaceId = useWorkspaceId();
    const t = useTranslations('Navbar');

    const router = useRouter();
    const { data: workspaces } = useGetWorkspaces();
    const { open } = useCreateWorkspaceModal();

    const onSelect = (id: string) => {
        router.push(`/workspaces/${id}`);
    };

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-sm uppercase font-bold">
                    {t('Client.label_workspace')}
                </p>
                <GitBranchPlus
                    onClick={open}
                    size={18}
                    className="cursor-pointer hover:opacity-75 transition"
                />
            </div>

            <Select onValueChange={onSelect} value={workspaceId}>
                <SelectTrigger className="w-full bg-gradient-to-r from-primary to-red-500 font-medium px-1 h-12 text-background dark:text-white">
                    <SelectValue placeholder={t('Client.select')} />
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map((workspace) => (
                        <SelectItem
                            key={workspace.$id}
                            value={workspace.$id}
                            className="cursor-pointer"
                        >
                            <div className="flex justify-start items-center gap-2 font-medium">
                                <WorkspaceAvatar
                                    name={workspace.name}
                                    image={workspace.imageUrl}
                                />
                                <span className="truncate">
                                    {workspace.name}
                                </span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

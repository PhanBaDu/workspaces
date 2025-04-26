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
import { SquarePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WorkspaceSwitcher() {
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const { data: workspaces } = useGetWorkspaces();
    const { open } = useCreateWorkspaceModal();

    const onSelect = (id: string) => {
        router.push(`/workspaces/${id}`);
    };

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-sm uppercase font-bold">Workspaces</p>
                <SquarePlus
                    onClick={open}
                    strokeWidth={2.4}
                    size={18}
                    className="cursor-pointer hover:opacity-75 transition"
                />
            </div>

            <Select onValueChange={onSelect} value={workspaceId}>
                <SelectTrigger className="w-full bg-primary font-medium px-1 h-12 text-background">
                    <SelectValue placeholder="No workspace seleted" />
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

'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspace';
import { WorkspaceAvatar } from '@/features/workspaces/components/workspace-avatar';
import { CirclePlus } from 'lucide-react';

export default function WorkspaceSwitcher() {
    const { data: workspaces } = useGetWorkspaces();

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase font-bold">Workspaces</p>
                <CirclePlus className="size-5 cursor-pointer hover:opacity-75 transition" />
            </div>

            <Select>
                <SelectTrigger className="w-full bg-neutral-200 font-medium px-1 h-12">
                    <SelectValue placeholder="No workspace seleted" />
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map((workspace) => (
                        <SelectItem key={workspace.$id} value={workspace.$id}>
                            <div className="flex justify-start items-center gap-3 font-medium">
                                <WorkspaceAvatar
                                    className="rounded-md"
                                    name={workspace.name}
                                    image={workspace.imageUrl}
                                />
                                <span className="truncate">{workspace.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

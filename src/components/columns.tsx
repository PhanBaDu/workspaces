'use client';
import ProjectActions from '@/components/project-actions';
import { Button } from '@/components/ui/button';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { Project } from '@/features/projects/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function useProjectColumns(): ColumnDef<Project>[] {
    const t = useTranslations('Task.Client');

    return [
        {
            accessorKey: 'imageUrl',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('col_2')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const project = row.original;
                if (!project) return null;
                return (
                    <div className="flex items-center gap-x-2 text-sm font-medium">
                        <ProjectAvatar
                            className="size-6"
                            name={project.name}
                            image={project.imageUrl}
                        />
                        <p className="line-clamp-1">{project.name}</p>
                    </div>
                );
            },
        },

        {
            id: 'actions',
            cell: ({ row }) => {
                const projectId = row.original.$id;
                const workspaceId = row.original.workspaceId;

                return (
                    <ProjectActions
                        workspaceId={workspaceId}
                        projectId={projectId}
                    >
                        <Button variant={'ghost'} className="size-8 p-0">
                            <MoreVertical className="size-4" />
                        </Button>
                    </ProjectActions>
                );
            },
        },
    ];
}

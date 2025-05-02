'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MemberAvatar } from '@/features/members/components/members-avatar';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { TaskActions } from '@/features/tasks/components/task-actions';
import { TaskDate } from '@/features/tasks/components/task-date';
import { Task } from '@/features/tasks/types';
// import { snakeCaseToTitleCase } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function useTaskColumns(): ColumnDef<Task>[] {
    const t = useTranslations('Task.Client');

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
                    {t('col_1')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <p className="line-clamp-1">{row.original.name}</p>
            ),
        },
        {
            accessorKey: 'project',
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
                const project = row.original.project;
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
            accessorKey: 'assignee',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('col_3')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const assignee = row.original.assignee;
                return (
                    <div className="flex items-center gap-x-2 text-sm font-medium">
                        <MemberAvatar
                            className="size-6"
                            fallbackClassName="text-xs"
                            name={assignee.name}
                        />
                        <p className="line-clamp-1">{assignee.name}</p>
                    </div>
                );
            },
        },
        {
            accessorKey: 'dueDate',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('col_4')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <TaskDate value={row.original.dueDate} />,
        },
        {
            accessorKey: 'status',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('col_5')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const status = row.original.status;
                return <Badge variant={status}>{t(`${status}`)}</Badge>;
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const id = row.original.$id;
                const projectId = row.original.project.$id;

                return (
                    <TaskActions id={id} projectId={projectId}>
                        <Button variant={'ghost'} className="size-8 p-0">
                            <MoreVertical className="size-4" />
                        </Button>
                    </TaskActions>
                );
            },
        },
    ];
}

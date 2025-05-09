'use client';

import Analytics from '@/components/analytics';
import { useProjectColumns } from '@/components/columns';
import { useMemberColumns } from '@/components/colums-members';
import PageError from '@/components/page-error';
import PageLoader from '@/components/page-loader';
import { Button } from '@/components/ui/button';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { Member } from '@/features/members/types';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';
import { Project } from '@/features/projects/types';
import { useGetTasks } from '@/features/tasks/api/use-get-tasks';
import { useTaskColumns } from '@/features/tasks/components/columns';
import { DataTable } from '@/features/tasks/components/data-table';
import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal';
import { Task } from '@/features/tasks/types';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useGetWorkspaceAnalytics } from '@/features/workspaces/api/use-get-workspace-analytics';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { PlusIcon, SettingsIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const WorkspaceIdClient = () => {
    const workspaceId = useWorkspaceId();
    const { data: workspace, isLoading: isLoadingWorkspace } = useGetWorkspace({
        workspaceId,
    });
    const { data: analytics, isLoading: isLoadingAnalytics } =
        useGetWorkspaceAnalytics({ workspaceId });

    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
        workspaceId,
    });

    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
        workspaceId,
    });
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({
        workspaceId,
    });

    const isLoading =
        isLoadingAnalytics ||
        isLoadingTasks ||
        isLoadingProjects ||
        isLoadingMembers ||
        isLoadingWorkspace;

    if (isLoading) return <PageLoader />;

    if (!analytics || !tasks || !projects || !members || !workspace)
        return <PageError />;

    return (
        <div className="h-full flex flex-col space-y-4">
            <Analytics data={analytics} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <MembersList data={members.documents} total={members.total} />
                <ProjectList data={projects.documents} total={projects.total} />
            </div>
            <TaskList data={tasks.documents} total={tasks.total} />
        </div>
    );
};

interface TaskListProps {
    data: Task[];
    total: number;
}

export const TaskList = ({ data, total }: TaskListProps) => {
    const { open: createTask } = useCreateTaskModal();
    const t = useTranslations('HomePage');
    const columns = useTaskColumns();

    return (
        <div className="flex flex-col gap-y-4 col-span-1 rounded-lg  bg-card">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold flex items-center gap-2">
                        {t('Client.tasks')}
                        <span className="px-3 py-1 bg-muted rounded-lg text-primary text-sm">
                            {total}
                        </span>
                    </p>
                    <Button
                        variant={'primary'}
                        size={'icon'}
                        onClick={createTask}
                    >
                        <PlusIcon className="size-4" />
                    </Button>
                </div>
                {/* <DashedSeparator className="my-4" /> */}
                <div className="my-4" />
                <DataTable columns={columns} data={data ?? []} />
            </div>
        </div>
    );
};

interface ProjectListProps {
    data: Project[];
    total: number;
}

export const ProjectList = ({ data, total }: ProjectListProps) => {
    const columns = useProjectColumns();
    const { open: createProject } = useCreateProjectModal();
    const t = useTranslations('HomePage');

    return (
        <div className="flex flex-col gap-y-4 col-span-1 rounded-lg  bg-card">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold flex items-center gap-2">
                        {t('Client.projects')}
                        <span className="px-3 py-1 bg-muted rounded-lg text-primary text-sm">
                            {total}
                        </span>
                    </p>
                    <Button
                        variant={'primary'}
                        size={'icon'}
                        onClick={createProject}
                    >
                        <PlusIcon className="size-4" />
                    </Button>
                </div>
                {/* <DashedSeparator className="my-4" />
                 */}
                <div className="my-4" />
                <DataTable columns={columns} data={data ?? []} />
            </div>
        </div>
    );
};

interface MembersListProps {
    data: Member[];
    total: number;
}

export const MembersList = ({ data, total }: MembersListProps) => {
    const workspaceId = useWorkspaceId();
    const t = useTranslations('HomePage');
    const columns = useMemberColumns();

    return (
        <div className="flex flex-col gap-y-4 col-span-1 rounded-lg bg-card">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold flex items-center gap-2">
                        {t('Client.members')}
                        <span className="px-3 py-1 bg-muted rounded-lg text-primary text-sm">
                            {total}
                        </span>
                    </p>
                    <Button asChild variant={'primary'} size={'icon'}>
                        <Link href={`/workspaces/${workspaceId}/members`}>
                            <SettingsIcon className="size-4" />
                        </Link>
                    </Button>
                </div>
                {/* <DashedSeparator className="my-4" /> */}
                <div className="my-4" />
                <DataTable columns={columns} data={data ?? []} />
            </div>
        </div>
    );
};

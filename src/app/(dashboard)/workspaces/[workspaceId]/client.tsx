'use client';

import Analytics from '@/components/analytics';
import { DashedSeparator } from '@/components/dashed-separator';
import PageError from '@/components/page-error';
import PageLoader from '@/components/page-loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { MemberAvatar } from '@/features/members/components/members-avatar';
import { Member } from '@/features/members/types';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';
import { Project } from '@/features/projects/types';
import { useGetTasks } from '@/features/tasks/api/use-get-tasks';
import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal';
import { Task } from '@/features/tasks/types';
import { useGetWorkspaceAnalytics } from '@/features/workspaces/api/use-get-workspace-analytics';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { formatDistanceToNow } from 'date-fns';
import { CalendarIcon, PlusIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';

export const WorkspaceIdClient = () => {
    const workspaceId = useWorkspaceId();

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
        isLoadingMembers;

    if (isLoading) return <PageLoader />;

    if (!analytics || !tasks || !projects || !members) return <PageError />;

    return (
        <div className="h-full flex flex-col space-y-4">
            <Analytics data={analytics} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <ProjectList data={projects.documents} total={projects.total} />
                <TaskList data={tasks.documents} total={tasks.total} />
                <MembersList data={members.documents} total={members.total} />
            </div>
        </div>
    );
};

interface TaskListProps {
    data: Task[];
    total: number;
}

export const TaskList = ({ data, total }: TaskListProps) => {
    const { open: createTask } = useCreateTaskModal();
    const workspaceId = useWorkspaceId();

    return (
        <div className="flex flex-col gap-y-4 col-span-1 rounded-lg bg-muted">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Tasks ({total})</p>
                    <Button
                        variant={'primary'}
                        size={'icon'}
                        onClick={createTask}
                    >
                        <PlusIcon className="size-4" />
                    </Button>
                </div>
                <DashedSeparator className="my-4" />
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {data.slice(0, 10).map((task) => (
                        <li key={task.id}>
                            <Link
                                href={`/workspaces/${workspaceId}/tasks/${task.$id}`}
                            >
                                <Card className="shadow-none border-none rounded-lg hover:opacity-75 transition">
                                    <CardContent className="p-4">
                                        <p className="text-xs lg:text-base font-medium truncate">
                                            {task.name}
                                        </p>
                                        <div className="flex items-center gap-x-2">
                                            <p className="text-xs lg:text-sm">
                                                {task.project.name}
                                            </p>
                                            <div className="size-1 rounded-full bg-muted-foreground/80" />
                                            <div className="text-sm text-muted-foreground flex items-center">
                                                <CalendarIcon className="size-3 mr-1" />
                                                <span className="truncate text-xs lg:text-sm">
                                                    {formatDistanceToNow(
                                                        new Date(task.dueDate),
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-start hidden first-of-type:block">
                        No tasks found
                    </li>
                </ul>
                <Button variant={'primary'} className="mt-4 w-full">
                    <Link href={`/workspaces/${workspaceId}/tasks`}>
                        Show All
                    </Link>
                </Button>
            </div>
        </div>
    );
};

interface ProjectListProps {
    data: Project[];
    total: number;
}

export const ProjectList = ({ data, total }: ProjectListProps) => {
    const { open: createProject } = useCreateProjectModal();
    const workspaceId = useWorkspaceId();

    return (
        <div className="flex flex-col gap-y-4 col-span-1 bg-muted rounded-lg">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Projects ({total})</p>
                    <Button
                        variant={'primary'}
                        size={'icon'}
                        onClick={createProject}
                    >
                        <PlusIcon className="size-4" />
                    </Button>
                </div>
                <DashedSeparator className="my-4" />
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {data.slice(0, 10).map((project) => (
                        <li key={project.id}>
                            <Link
                                href={`/workspaces/${workspaceId}/projects/${project.$id}`}
                            >
                                <Card className="shadow-none border-none rounded-lg hover:opacity-75 transition">
                                    <CardContent className="p-4 flex items-center gap-x-2.5">
                                        <ProjectAvatar
                                            className="size-12"
                                            fallbackClassName="text-lg"
                                            name={project.name}
                                            image={project.imageUrl}
                                        />
                                        <p className="text-lg font-medium truncate">
                                            {project.name}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-start hidden first-of-type:block">
                        No project found
                    </li>
                </ul>
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

    return (
        <div className="flex flex-col gap-y-4 col-span-1 rounded-lg bg-muted">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Members ({total})</p>
                    <Button asChild variant={'primary'} size={'icon'}>
                        <Link href={`/workspaces/${workspaceId}/members`}>
                            <SettingsIcon className="size-4" />
                        </Link>
                    </Button>
                </div>
                <DashedSeparator className="my-4" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.slice(0, 10).map((member) => (
                        <li key={member.id}>
                            <Card className="shadow-none border-none rounded-lg overflow-hidden">
                                <CardContent className="p-3 flex flex-col items-center gap-x-2">
                                    <MemberAvatar
                                        className="size-12"
                                        name={member.name}
                                    />
                                    <div className="flex flex-col items-center overflow-hidden">
                                        <p className="text-sm lg:text-base font-medium line-clamp-1">
                                            {member.name}
                                        </p>
                                        <p className="text-xs lg:text-sm text-muted-foreground line-clamp-1">
                                            {member.email}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No members found
                    </li>
                </ul>
            </div>
        </div>
    );
};

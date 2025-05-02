import { Button } from '@/components/ui/button';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { Project } from '@/features/projects/types';
import { useDeleteTask } from '@/features/tasks/api/use-delete-task';
import { Task } from '@/features/tasks/types';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useConfirm } from '@/hooks/use-confirm';
import { ChevronRightIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface TaskBreadcrumbsProps {
    project: Project;
    task: Task;
}

export default function TaskBreadcrumbs({
    project,
    task,
}: TaskBreadcrumbsProps) {
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const t = useTranslations('Task.Client');
    const { mutate, isPending } = useDeleteTask();

    const [ConfigDialog, confirm] = useConfirm(
        `${t('action_delete_task')}`,
        `${t('action_delete_desc')}`,
        'destructive',
    );

    const handleDeleteTask = async () => {
        const ok = await confirm();

        if (!ok) return;

        mutate(
            { param: { taskId: task.$id } },
            {
                onSuccess: () => {
                    router.push(`/workspaces/${workspaceId}/tasks`);
                },
            },
        );
    };

    return (
        <div className="flex items-center gap-x-2">
            <ConfigDialog />
            <ProjectAvatar
                name={project.name}
                image={project.imageUrl}
                className="size-6 lg:size-8 mr-2"
            />
            <Link
                href={`/workspaces/${workspaceId}/projects/${project.$id}?projectId=${project.$id}`}
            >
                <p className="text-xs lg:text-lg font-semibold text-muted-foreground hover:opacity-75">
                    {project.name}
                </p>
            </Link>
            <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
            <p className="text-sm lg:text-lg font-semibold">{task.name}</p>
            <Button
                onClick={handleDeleteTask}
                className="ml-auto"
                variant="destructive"
                size={'sm'}
                disabled={isPending}
            >
                <TrashIcon className="size-4 lg:mr-2" />
                <span className="hidden lg:block">{t('delete_label')}</span>
            </Button>
        </div>
    );
}

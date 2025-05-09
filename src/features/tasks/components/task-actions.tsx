import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteTask } from '@/features/tasks/api/use-delete-task';
import { useEditTaskModal } from '@/features/tasks/hooks/use-update-task-modal';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useConfirm } from '@/hooks/use-confirm';
import { PencilRuler, SquareArrowOutUpRight, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface TaskActionsProps {
    id: string;
    projectId: string;
    children: React.ReactNode;
}

export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const t = useTranslations('Task.Client');

    const { open } = useEditTaskModal();

    const [ConfirmDialog, confirm] = useConfirm(
        `${t('action_delete_title')}`,
        `${t('action_delete_desc')}`,
        'destructive',
    );

    const { mutate, isPending } = useDeleteTask();

    const onDelete = async () => {
        const ok = await confirm();

        if (!ok) return null;
        mutate({ param: { taskId: id } });
    };

    const onOpenTask = () => {
        router.push(`/workspaces/${workspaceId}/tasks/${id}`);
    };

    const onOpenProject = () => {
        router.push(
            `/workspaces/${workspaceId}/projects/${projectId}?projectId=${projectId}`,
        );
    };

    return (
        <div className="flex justify-end">
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem
                        onClick={onOpenProject}
                        className="font-medium p-[10px] cursor-pointer"
                    >
                        <SquareArrowOutUpRight className="size-4 stroke-2" />
                        {t('action_open_project')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onOpenTask}
                        className="font-medium p-[10px] cursor-pointer"
                    >
                        <SquareArrowOutUpRight className="size-4 stroke-2" />
                        {t('action_task_details')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => open(id)}
                        className="font-medium p-[10px] cursor-pointer"
                    >
                        <PencilRuler className="size-4 stroke-2" />
                        {t('action_edit_task')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onDelete}
                        disabled={isPending}
                        className="dark:text-red-500 text-destructive focus:text-destructive font-medium p-[10px] cursor-pointer"
                    >
                        <TrashIcon className="size-4 stroke-2" />
                        {t('action_delete_task')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

import { Button } from '@/components/ui/button';
import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal';
import { TaskStatus } from '@/features/tasks/types';
// import { snakeCaseToTitleCase } from '@/lib/utils';
import {
    CircleCheckIcon,
    CircleDashedIcon,
    CircleDotDashedIcon,
    CircleDotIcon,
    CircleIcon,
    PlusIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface KanbanColumnHeaderProps {
    board: TaskStatus;
    taskCount: number;
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
    [TaskStatus.BACKLOG]: (
        <CircleDashedIcon className="size-[18px] text-pink-400" />
    ),
    [TaskStatus.TODO]: <CircleIcon className="size-[18px] text-red-400" />,
    [TaskStatus.IN_PROGRESS]: (
        <CircleDotDashedIcon className="size-[18px] text-yellow-400" />
    ),
    [TaskStatus.IN_REVIEW]: (
        <CircleDotIcon className="size-[18px] text-blue-400" />
    ),
    [TaskStatus.DONE]: (
        <CircleCheckIcon className="size-[18px] text-emerald-400" />
    ),
};

export default function KanbanColumnHeader({
    board,
    taskCount,
}: KanbanColumnHeaderProps) {
    const { open } = useCreateTaskModal();
    const icon = statusIconMap[board];
    const t = useTranslations('Task.Client');

    return (
        <div className="px-2 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
                {icon}
                <h2 className="text-sm font-medium">
                    {/* {snakeCaseToTitleCase(board)} */}
                    {t(board)}
                </h2>
                <div className="size-5 flex items-center justify-center rounded-md bg-muted-foreground/15 text-[10px] text-primary font-medium">
                    {taskCount}
                </div>
            </div>
            <Button
                className="size-5 rounded"
                variant={'primary'}
                size={'icon'}
                onClick={open}
            >
                <PlusIcon className="size-4" />
            </Button>
        </div>
    );
}

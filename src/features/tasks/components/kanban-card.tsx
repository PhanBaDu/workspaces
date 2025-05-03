import { DashedSeparator } from '@/components/dashed-separator';
import { MemberAvatar } from '@/features/members/components/members-avatar';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { TaskActions } from '@/features/tasks/components/task-actions';
import { TaskDate } from '@/features/tasks/components/task-date';
import { Task, TaskStatus } from '@/features/tasks/types';
import { MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface KanbanCardProps {
    task: Task;
}

const statusStyleMap: Record<TaskStatus, string> = {
    [TaskStatus.BACKLOG]: 'border-l-[5px] border-pink-400',
    [TaskStatus.TODO]: 'border-l-[5px] border-red-400',
    [TaskStatus.IN_PROGRESS]: 'border-l-[5px] border-yellow-400',
    [TaskStatus.IN_REVIEW]: 'border-l-[5px] border-blue-400',
    [TaskStatus.DONE]: 'border-l-[5px] border-emerald-400',
};

export default function KanbanCard({ task }: KanbanCardProps) {
    const style = statusStyleMap[task.status];
    const t = useTranslations('Member.Client');

    return (
        <div
            className={`${style} bg-background p-2.5 mb-1.5 rounded shadow-sm space-y-3`}
        >
            <div className="flex items-start justify-between gap-x-2">
                <p className="text-sm line-clamp-2">{task?.name}</p>
                <TaskActions id={task?.$id} projectId={task?.projectId}>
                    <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-primary hover:opacity-75 transition" />
                </TaskActions>
            </div>
            <DashedSeparator />
            {!task.assignee ? (
                <h1 className="text-xs text-destructive">{t('check')}</h1>
            ) : (
                <div className="flex items-center gap-x-1.5">
                    <MemberAvatar
                        name={task?.assignee.name}
                        fallbackClassName="text-[10px]"
                    />
                    <div className="size-1 rounded-full bg-muted-foreground" />
                    <TaskDate value={task?.dueDate} className="text-xs" />
                </div>
            )}

            <div className="flex items-center gap-x-1.5">
                <ProjectAvatar
                    name={task?.project.name}
                    image={task?.project.imageUrl}
                    fallbackClassName="text-[10px]"
                />
                <span className="text-xs font-medium">
                    {task?.project.name}
                </span>
            </div>
        </div>
    );
}

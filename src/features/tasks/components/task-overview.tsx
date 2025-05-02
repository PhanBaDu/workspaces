import { DashedSeparator } from '@/components/dashed-separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MemberAvatar } from '@/features/members/components/members-avatar';
import OverviewProperty from '@/features/tasks/components/overview-property';
import { TaskDate } from '@/features/tasks/components/task-date';
import { useEditTaskModal } from '@/features/tasks/hooks/use-update-task-modal';
import { Task } from '@/features/tasks/types';
// import { snakeCaseToTitleCase } from '@/lib/utils';
import { PencilIcon } from 'lucide-react';
import { useTranslations } from 'use-intl';

interface TaskOverviewProps {
    task: Task;
}
export default function TaskOverview({ task }: TaskOverviewProps) {
    const t = useTranslations('Task.Client');
    const { open } = useEditTaskModal();

    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                        {t('overview_title')}
                    </p>
                    <Button
                        onClick={() => open(task.$id)}
                        size={'sm'}
                        variant={'secondary'}
                    >
                        <PencilIcon className="size-4 mr-2" />
                        {t('edit')}
                    </Button>
                </div>
                <DashedSeparator className="my-4" />
                <div className="flex flex-col gap-y-4">
                    <OverviewProperty label={t('due_date_ass')}>
                        <MemberAvatar
                            name={task.assignee.name}
                            className="size-6"
                        />
                        <p className="text-sm font-medium">
                            {task.assignee.name}
                        </p>
                    </OverviewProperty>
                    <OverviewProperty label={t('due_date_label')}>
                        <TaskDate
                            value={task.dueDate}
                            className="text-sm font-medium"
                        />
                    </OverviewProperty>
                    <OverviewProperty label={t('status_label')}>
                        <Badge variant={task.status}>
                            {/* {snakeCaseToTitleCase(task.status)} */}
                            {t(task.status)}
                        </Badge>
                    </OverviewProperty>
                </div>
            </div>
        </div>
    );
}

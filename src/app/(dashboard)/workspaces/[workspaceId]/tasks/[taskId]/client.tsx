'use client';

import PageError from '@/components/page-error';
import PageLoader from '@/components/page-loader';
import { useGetTask } from '@/features/tasks/api/use-get-task';
import TaskDescription from '@/features/tasks/components/task-description';
import TaskOverview from '@/features/tasks/components/task-overview';
import TaskBreadcrumbs from '@/features/tasks/components/taskbreadcrumbs';
import { useTaskId } from '@/features/tasks/hooks/use-task-id';
import { useTranslations } from 'next-intl';

export const TaskIdClient = () => {
    const taskId = useTaskId();
    const t = useTranslations('PageError.Client');
    const { data, isLoading } = useGetTask({ taskId });

    if (isLoading) return <PageLoader />;
    if (!data) return <PageError message={t('task_not_found')} />;

    return (
        <div className="flex flex-col">
            <TaskBreadcrumbs project={data.project} task={data} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <TaskOverview task={data} />
                <TaskDescription task={data} />
            </div>
        </div>
    );
};

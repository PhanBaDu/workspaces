import AnalyticsCard from '@/components/analytics-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ProjectAnalyticsResponseType } from '@/features/projects/api/use-get-project-analytics';
import { useTranslations } from 'next-intl';

export default function Analytics({ data }: ProjectAnalyticsResponseType) {
    const t = useTranslations('Analytic');

    return (
        <ScrollArea className="rounded-lg w-full whitespace-nowrap shrink-0">
            <div className="w-full flex flex-row gap-4 bg-card">
                <div className="flex items-center flex-1 border-r border-dashed border-r-primary">
                    <AnalyticsCard
                        title={t('Client.total')}
                        value={data.taskCount}
                        // variant={data.taskDifference > 0 ? 'up' : 'down'}
                        // increaseValue={data.taskDifference}
                        variant={data.taskCount > 0 ? 'up' : 'down'}
                        increaseValue={data.taskCount}
                    />
                    {/* <DashedSeparator
                        direction="vertical"
                        className="bg-primary"
                    /> */}
                </div>
                <div className="flex items-center flex-1 border-r border-dashed border-r-primary">
                    <AnalyticsCard
                        title={t('Client.assigned')}
                        value={data.assignedTaskCount}
                        // variant={
                        //     data.assignedTaskDifference > 0 ? 'up' : 'down'
                        // }
                        // increaseValue={data.assignedTaskDifference}
                        variant={data.assignedTaskCount > 0 ? 'up' : 'down'}
                        increaseValue={data.assignedTaskCount}
                    />
                    {/* <DashedSeparator
                        direction="vertical"
                        className="bg-primary"
                    /> */}
                </div>
                <div className="flex items-center flex-1 border-r border-dashed border-r-primary">
                    <AnalyticsCard
                        title={t('Client.completed')}
                        value={data.completedTaskCount}
                        // variant={
                        //     data.completedTaskDifference > 0 ? 'up' : 'down'
                        // }
                        // increaseValue={data.completedTaskDifference}
                        variant={data.completedTaskCount > 0 ? 'up' : 'down'}
                        increaseValue={data.completedTaskCount}
                    />
                    {/* <DashedSeparator
                        direction="vertical"
                        className="bg-primary"
                    /> */}
                </div>
                <div className="flex items-center flex-1 border-r border-dashed border-r-primary">
                    <AnalyticsCard
                        title={t('Client.overdue')}
                        value={data.overdueTaskCount}
                        // variant={data.overdueTaskDifference > 0 ? 'up' : 'down'}
                        // increaseValue={data.overdueTaskDifference}
                        variant={data.overdueTaskCount > 0 ? 'up' : 'down'}
                        increaseValue={data.overdueTaskCount}
                    />
                    {/* <DashedSeparator
                        direction="vertical"
                        className="bg-primary"
                    /> */}
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title={t('Client.incomplete')}
                        value={data.incompleteTaskCount}
                        // variant={
                        //     data.incompleteTaskDifference > 0 ? 'up' : 'down'
                        // }
                        // increaseValue={data.incompleteTaskDifference}
                        variant={data.incompleteTaskCount > 0 ? 'up' : 'down'}
                        increaseValue={data.incompleteTaskCount}
                    />
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}

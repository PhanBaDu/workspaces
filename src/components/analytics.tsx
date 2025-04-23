import AnalyticsCard from '@/components/analytics-card';
import { DashedSeparator } from '@/components/dashed-separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ProjectAnalyticsResponseType } from '@/features/projects/api/use-get-project-analytics';

export default function Analytics({ data }: ProjectAnalyticsResponseType) {
    return (
        <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
            <div className="w-full flex flex-row">
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Total tasks"
                        value={data.taskCount}
                        variant={data.taskDifference > 0 ? 'up' : 'down'}
                        increaseValue={data.taskDifference}
                    />
                    <DashedSeparator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Assigned Tasks"
                        value={data.assignedTaskCount}
                        variant={
                            data.assignedTaskDifference > 0 ? 'up' : 'down'
                        }
                        increaseValue={data.assignedTaskDifference}
                    />
                    <DashedSeparator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Completed Tasks"
                        value={data.completedTaskCount}
                        variant={
                            data.completedTaskDifference > 0 ? 'up' : 'down'
                        }
                        increaseValue={data.completedTaskDifference}
                    />
                    <DashedSeparator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Overdue Tasks"
                        value={data.overdueTaskCount}
                        variant={data.overdueTaskDifference > 0 ? 'up' : 'down'}
                        increaseValue={data.overdueTaskDifference}
                    />
                    <DashedSeparator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Incomplete Tasks"
                        value={data.incompleteTaskCount}
                        variant={
                            data.incompleteTaskDifference > 0 ? 'up' : 'down'
                        }
                        increaseValue={data.incompleteTaskDifference}
                    />
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}

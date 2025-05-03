'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { format } from 'date-fns';
import { TaskAnalyticsData } from '@/features/admin/api/use-get-analytics-tasks';
import React from 'react';

const chartConfig = {
    tasks: {
        label: 'Tasks',
        color: 'hsl(var(--chart-3))',
    },
} satisfies ChartConfig;

export function CharDots({
    analyticTask,
}: {
    analyticTask: TaskAnalyticsData | undefined;
}) {
    const date = new Date();
    const fullDate = format(date, 'dd/MM/yyyy');

    const chartData = React.useMemo(() => {
        if (!analyticTask) return [];
        return [
            { status: 'Back log', tasks: analyticTask.BACKLOG },
            { status: 'To Do', tasks: analyticTask.TODO },
            { status: 'In Progress', tasks: analyticTask.IN_PROGRESS },
            { status: 'In Review', tasks: analyticTask.IN_REVIEW },
            { status: 'Done', tasks: analyticTask.DONE },
            { status: 'Total', tasks: analyticTask.total },
        ];
    }, [analyticTask]);

    if (!analyticTask) return <div>Loading...</div>;

    return (
        <Card className="shadow-none rounded-lg border-none">
            <CardHeader className="items-center">
                <CardTitle>BIỂU ĐỒ RADAR - TASKS</CardTitle>
                <CardDescription>
                    Thống kê trạng thái các tasks {fullDate}
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] w-full"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <PolarAngleAxis dataKey="status" />
                        <PolarGrid />
                        <Radar
                            name="Tasks"
                            dataKey="tasks"
                            stroke="hsl(var(--chart-3))"
                            fill="hsl(var(--chart-3))"
                            fillOpacity={0.6}
                            dot={{ r: 4, fillOpacity: 1 }}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    Tổng số Tasks có trong hệ thống vào ngày {fullDate}
                </div>
            </CardFooter>
        </Card>
    );
}

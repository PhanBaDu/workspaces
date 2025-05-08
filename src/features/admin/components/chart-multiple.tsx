'use client';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
    Card,
    CardContent,
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
import { MonthlyAnalyticsData } from '@/features/admin/api/use-get-analytics-all';
import { useTranslations } from 'next-intl';

const chartConfig = {
    workspaces: {
        label: 'Workspaces',
        color: 'hsl(var(--chart-1))',
    },
    projects: {
        label: 'Projects',
        color: 'hsl(var(--chart-2))',
    },
    tasks: {
        label: 'Tasks',
        color: 'hsl(var(--chart-3))',
    },
} satisfies ChartConfig;

export function ChartMultiple({
    analyticsAll,
}: {
    analyticsAll: MonthlyAnalyticsData[];
}) {
    const t = useTranslations('System.Client');

    return (
        <Card className="shadow-none rounded-lg border-none bg-background">
            <CardHeader>
                <CardTitle>{t('desc_3')} (2025)</CardTitle>
            </CardHeader>
            <CardContent className="h-96 w-full overflow-x-auto">
                <div className="min-w-[1000px] h-full">
                    <ChartContainer
                        config={chartConfig}
                        className="h-96 w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={analyticsAll}
                            className="h-96"
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="dashed" />
                                }
                            />
                            <Bar
                                dataKey="workspaces"
                                fill="var(--color-workspaces)"
                                radius={4}
                            />
                            <Bar
                                dataKey="projects"
                                fill="var(--color-projects)"
                                radius={4}
                            />
                            <Bar
                                dataKey="tasks"
                                fill="var(--color-tasks)"
                                radius={4}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm pt-2">
                <div className="leading-none text-muted-foreground">
                    {t('desc_4')} (2025)
                </div>
            </CardFooter>
        </Card>
    );
}

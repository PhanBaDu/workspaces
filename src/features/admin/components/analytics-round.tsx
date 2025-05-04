'use client';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';
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
import { useTranslations } from 'next-intl';

const chartConfig = {
    visitors: {
        label: 'Workspaces',
    },
} satisfies ChartConfig;

interface WorkspaceStats {
    service: string;
    visitors: number;
    fill: string;
}

export function AnalyticsRound({
    chart,
    title,
}: {
    chart: WorkspaceStats[];
    title: string;
}) {
    const t = useTranslations('System.Client');
    const totalVisitors = React.useMemo(() => {
        return chart.reduce((acc, curr) => acc + curr.visitors, 0);
    }, [chart]);

    const date = new Date();
    const fullDate = format(date, 'dd/MM/yyyy');

    return (
        <Card className="flex flex-col shadow-none rounded-lg">
            <CardHeader className="items-center pb-0">
                <CardTitle className="uppercase">
                    {t('title')} {title}
                </CardTitle>
                <CardDescription>{fullDate}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chart}
                            dataKey="visitors"
                            nameKey="service"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {title}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    {t('desc_1')}{' '}
                    <span className="text-primary font-bold">{title}</span>{' '}
                    {t('desc_2')}
                </div>
            </CardFooter>
        </Card>
    );
}

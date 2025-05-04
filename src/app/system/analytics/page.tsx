'use client';
import PageError from '@/components/page-error';
import { useGetAnalytics } from '@/features/admin/api/use-get-analytics';
import { useMonthlyAnalytics } from '@/features/admin/api/use-get-analytics-all';
import { useTaskAnalytics } from '@/features/admin/api/use-get-analytics-tasks';
import { AnalyticsRound } from '@/features/admin/components/analytics-round';
import { CharDots } from '@/features/admin/components/chart-dots';
import { ChartMultiple } from '@/features/admin/components/chart-multiple';

export default function SystemAnalyticPage() {
    const { data, isLoading, error } = useGetAnalytics();
    const workspaces = data?.workspaces ?? [];
    const users = data?.users ?? [];
    const projects = data?.projects ?? [];
    const tasks = data?.tasks ?? [];

    const { data: analyticTask, isLoading: isLoadingTask } = useTaskAnalytics();
    const { data: analyticsAll, isLoading: isLoadingAll } =
        useMonthlyAnalytics();

    if (isLoading || isLoadingTask || isLoadingAll)
        return (
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div className="w-full h-96 bg-muted animate-pulse rounded-lg"></div>
                    <div className="w-full h-96 bg-muted animate-pulse rounded-lg"></div>
                    <div className="w-full h-96 bg-muted animate-pulse rounded-lg"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div className="w-full h-96 bg-muted animate-pulse rounded-lg"></div>
                    <div className="w-full h-96 bg-muted animate-pulse rounded-lg"></div>
                </div>
                <div className="w-full h-96 bg-muted animate-pulse rounded-lg"></div>
            </div>
        );
    if (
        error ||
        !tasks ||
        !workspaces ||
        !users ||
        !projects ||
        !analyticTask ||
        !analyticsAll
    )
        return <PageError />;
    return (
        <div className="text-sm p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <AnalyticsRound chart={workspaces} title={'Workspaces'} />
                <AnalyticsRound chart={users} title={'Users'} />
                <AnalyticsRound chart={projects} title={'Projects'} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <AnalyticsRound chart={tasks} title={'Tasks'} />
                <CharDots analyticTask={analyticTask} />
            </div>
            <ChartMultiple analyticsAll={analyticsAll} />
        </div>
    );
}

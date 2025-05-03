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
        return <div>Loading...</div>;
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
        <div className="min-h-screen bg-muted text-sm p-10 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AnalyticsRound chart={workspaces} title={'Workspaces'} />
                <AnalyticsRound chart={users} title={'Users'} />
                <AnalyticsRound chart={projects} title={'Projects'} />
                <AnalyticsRound chart={tasks} title={'Tasks'} />
            </div>
            <CharDots analyticTask={analyticTask} />
            <ChartMultiple analyticsAll={analyticsAll} />
        </div>
    );
}

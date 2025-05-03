import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/rpc';

export interface TaskAnalyticsData {
    BACKLOG: number;
    TODO: number;
    IN_PROGRESS: number;
    IN_REVIEW: number;
    DONE: number;
    total: number;
}

export const useTaskAnalytics = () => {
    const query = useQuery<TaskAnalyticsData, Error>({
        queryKey: ['analyticsAll'],
        queryFn: async () => {
            const res = await client.api.admin.system.analytics.tasks.$get();
            if (!res.ok) throw new Error('Failed to fetch task analytics');
            const { data } = await res.json();
            return data as TaskAnalyticsData;
        },
    });

    return query;
};

import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

export interface MonthlyAnalyticsData {
    month: string;
    workspaces: number;
    projects: number;
    tasks: number;
}

export const useMonthlyAnalytics = () => {
    const query = useQuery<MonthlyAnalyticsData[], Error>({
        queryKey: ['monthlyAnalytics'],
        queryFn: async () => {
            const res = await client.api.admin.system.analytics.all.$get();
            if (!res.ok) throw new Error('Failed to fetch monthly analytics');
            const { data } = await res.json();
            return data as MonthlyAnalyticsData[];
        },
    });

    return query;
};

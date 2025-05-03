import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

export const useGetAnalytics = () => {
    const query = useQuery({
        queryKey: ['analyticsall'],
        queryFn: async () => {
            const response = await client.api.admin.system.analytics.$get();

            if (!response.ok) {
                throw new Error('Failted to fetch analytics all');
            }

            const { data } = await response.json();

            return data;
        },
    });
    return query;
};

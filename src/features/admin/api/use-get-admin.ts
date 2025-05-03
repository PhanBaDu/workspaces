import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

export const useGetAdmin = () => {
    const query = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const response = await client.api.admin.isAdmin.$get();

            if (!response.ok) {
                throw new Error('Failted to fetch admin');
            }

            const { data } = await response.json();

            return data;
        },
    });
    return query;
};

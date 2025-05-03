import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';

interface UserGetMemberProps {
    workspaceId: string;
}

export const useGetMember = ({ workspaceId }: UserGetMemberProps) => {
    const query = useQuery({
        queryKey: ['member', workspaceId],
        queryFn: async () => {
            const response = await client.api.members.member.$get({
                query: { workspaceId },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch member');
            }

            const { data } = await response.json();

            return data;
        },
    });
    return query;
};

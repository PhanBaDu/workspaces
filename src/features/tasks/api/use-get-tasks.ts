import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';
import { TaskStatus } from '@/features/tasks/types';

interface UseGetTasksProps {
    workspaceId: string;
    projectId?: string | null;
    assigneeId?: string | null;
    status?: TaskStatus | null;
    dueDate?: string | null;
    search?: string | null;
}

export const useGetTasks = ({
    workspaceId,
    assigneeId,
    dueDate,
    projectId,
    status,
    search,
}: UseGetTasksProps) => {
    const query = useQuery({
        queryKey: [
            'tasks',
            workspaceId,
            projectId,
            assigneeId,
            status,
            dueDate,
            search,
        ],
        queryFn: async () => {
            const response = await client.api.tasks.$get({
                query: {
                    workspaceId,
                    projectId: projectId ?? undefined,
                    assigneeId: assigneeId ?? undefined,
                    status: status ?? undefined,
                    dueDate: dueDate ?? undefined,
                    search: search ?? undefined,
                },
            });

            if (!response.ok) {
                throw new Error('Failted to fetch tasks');
            }

            const { data } = await response.json();

            return data;
        },
    });
    return query;
};

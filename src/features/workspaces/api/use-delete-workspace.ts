import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useTranslations } from 'next-intl';

type ResponseType = InferResponseType<
    (typeof client.api.workspaces)[':workspaceId']['$delete'],
    200
>;
type RequestType = InferRequestType<
    (typeof client.api.workspaces)[':workspaceId']['$delete']
>;

export const useDeleteWorkspace = () => {
    const t = useTranslations('SettingsPage');
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.workspaces[':workspaceId'][
                '$delete'
            ]({ param });

            if (!response.ok) {
                throw new Error('Failed to delete workspace');
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success(`${t('Server.danger_success')}`);
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
            queryClient.invalidateQueries({
                queryKey: ['workspace', data.$id],
            });
        },
        onError: () => {
            toast.error(`${t('Server.danger_fail')}`);
        },
    });

    return mutation;
};

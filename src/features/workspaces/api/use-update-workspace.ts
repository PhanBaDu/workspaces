import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useTranslations } from 'next-intl';

type ResponseType = InferResponseType<
    (typeof client.api.workspaces)[':workspaceId']['$patch'],
    200
>;
type RequestType = InferRequestType<
    (typeof client.api.workspaces)[':workspaceId']['$patch']
>;

export const useUpdateWorkspace = () => {
    const t = useTranslations('SettingsPage');
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form, param }) => {
            const response = await client.api.workspaces[':workspaceId'][
                '$patch'
            ]({ form, param });
            if (!response.ok) {
                throw new Error('Failed to update workspace');
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success(`${t('Server.success')}`);
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
            queryClient.invalidateQueries({ queryKey: ['workspace'] });
            queryClient.invalidateQueries({
                queryKey: ['workspaces', data.$id],
            });
            queryClient.invalidateQueries({
                queryKey: ['workspace', data.$id],
            });
        },
        onError: () => {
            toast.error(`${t('Server.fail')}`);
        },
    });

    return mutation;
};

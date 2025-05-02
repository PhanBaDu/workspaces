import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useTranslations } from 'next-intl';

type ResponseType = InferResponseType<(typeof client.api.tasks)['$post'], 200>;
type RequestType = InferRequestType<(typeof client.api.tasks)['$post']>;

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const t = useTranslations('Task.Server');

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.tasks['$post']({ json });

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success(`${t('action_new_success')}`);
            queryClient.invalidateQueries({ queryKey: ['project-analytics'] });
            queryClient.invalidateQueries({
                queryKey: ['workspace-analytics'],
            });
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: () => {
            toast.error(`${t('action_new_fail')}`);
        },
    });

    return mutation;
};

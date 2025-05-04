import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useTranslations } from 'next-intl';

type ResponseType = InferResponseType<
    (typeof client.api.tasks)[':taskId']['$patch'],
    200
>;
type RequestType = InferRequestType<
    (typeof client.api.tasks)[':taskId']['$patch']
>;

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const t = useTranslations('Task.Server');
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.tasks[':taskId']['$patch']({
                json,
                param,
            });

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success(`${t('action_edit_success')}`, {
                style: {
                    color: '#059669',
                    fontWeight: 'bold',
                },
            });
            queryClient.invalidateQueries({ queryKey: ['project-analytics'] });
            queryClient.invalidateQueries({
                queryKey: ['workspace-analytics'],
            });
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['tasks', data.$id] });
        },
        onError: () => {
            toast.error(`${t('action_edit_fail')}`, {
                style: {
                    color: '#e11d48',
                    fontWeight: 'bold',
                },
            });
        },
    });

    return mutation;
};

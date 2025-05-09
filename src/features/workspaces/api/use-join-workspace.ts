import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useTranslations } from 'next-intl';

type ResponseType = InferResponseType<
    (typeof client.api.workspaces)[':workspaceId']['join']['$post'],
    200
>;
type RequestType = InferRequestType<
    (typeof client.api.workspaces)[':workspaceId']['join']['$post']
>;

export const useJoinWorkspace = () => {
    const queryClient = useQueryClient();
    const t = useTranslations('Join.Server');

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.workspaces[':workspaceId'][
                'join'
            ]['$post']({
                json,
                param,
            });

            if (!response.ok) {
                throw new Error('Failed to join workspace');
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success(`${t('success')}`, {
                style: {
                    color: '#059669',
                    fontWeight: 'bold',
                },
            });
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });

            queryClient.invalidateQueries({
                queryKey: ['workspace', data.$id],
            });
            queryClient.invalidateQueries({
                queryKey: ['members', data.$id],
            });
        },
        onError: () => {
            toast.error(`${t('fail')}`, {
                style: {
                    color: '#e11d48',
                    fontWeight: 'bold',
                },
            });
        },
    });

    return mutation;
};

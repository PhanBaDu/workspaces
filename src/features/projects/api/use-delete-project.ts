import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useTranslations } from 'next-intl';

type ResponseType = InferResponseType<
    (typeof client.api.projects)[':projectId']['$delete'],
    200
>;
type RequestType = InferRequestType<
    (typeof client.api.projects)[':projectId']['$delete']
>;

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    const t = useTranslations('Project');

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.projects[':projectId']['$delete'](
                {
                    param,
                },
            );

            if (!response.ok) {
                throw new Error('Failed to delete projects');
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success(`${t('Server.d_success')}`);
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['project', data.$id] });
        },
        onError: () => {
            toast.error(`${t('Server.d_fail')}`);
        },
    });

    return mutation;
};

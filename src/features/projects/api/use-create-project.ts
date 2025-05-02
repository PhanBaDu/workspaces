import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useTranslations } from 'next-intl';

type ResponseType = InferResponseType<
    (typeof client.api.projects)['$post'],
    200
>;
type RequestType = InferRequestType<(typeof client.api.projects)['$post']>;

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const t = useTranslations('Project');

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form }) => {
            const response = await client.api.projects['$post']({ form });

            if (!response.ok) {
                throw new Error('Failed to create projects');
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success(`${t('Server.c_success')}`);
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['projects', data.$id] });
        },
        onError: () => {
            toast.error(`${t('Server.c_fail')}`);
        },
    });

    return mutation;
};

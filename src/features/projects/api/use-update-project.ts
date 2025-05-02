import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useTranslations } from 'next-intl';

type ResponseType = InferResponseType<
    (typeof client.api.projects)[':projectId']['$patch'],
    200
>;
type RequestType = InferRequestType<
    (typeof client.api.projects)[':projectId']['$patch']
>;

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    const t = useTranslations('Project');
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form, param }) => {
            const response = await client.api.projects[':projectId']['$patch']({
                form,
                param,
            });

            if (!response.ok) {
                throw new Error('Failed to create projects');
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success(`${t('Server.u_success')}`);
            queryClient.invalidateQueries({ queryKey: ['project'] });
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['project', data.$id] });
            queryClient.invalidateQueries({ queryKey: ['projects', data.$id] });
            queryClient.invalidateQueries({ queryKey: ['tasks', data.$id] });
        },
        onError: () => {
            toast.error(`${t('Server.u_fail')}`);
        },
    });

    return mutation;
};

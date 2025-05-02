import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useTranslations } from 'next-intl';

type ResponseType = InferResponseType<
    (typeof client.api.workspaces)['$post'],
    200
>;
type RequestType = InferRequestType<(typeof client.api.workspaces)['$post']>;

export const useCreateWorkspace = () => {
    const t = useTranslations('WorkspacePage');
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form }) => {
            const response = await client.api.workspaces['$post']({ form });

            if (!response.ok) {
                throw new Error('Failed to create workspace');
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success(`${t('Server.success')}`);
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        },
        onError: () => {
            toast.error(`${t('Server.fail')}`);
        },
    });

    return mutation;
};

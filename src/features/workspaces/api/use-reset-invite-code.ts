import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useTranslations } from 'next-intl';

type ResponseType = InferResponseType<
    (typeof client.api.workspaces)[':workspaceId']['reset-invite-code']['$post'],
    200
>;
type RequestType = InferRequestType<
    (typeof client.api.workspaces)[':workspaceId']['reset-invite-code']['$post']
>;

export const useResetInviteCode = () => {
    const t = useTranslations('SettingsPage');

    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.workspaces[':workspaceId'][
                'reset-invite-code'
            ]['$post']({ param });

            if (!response.ok) {
                throw new Error('Failed to reset invite code');
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success(`${t('Server.invite_success')}`, {
                style: {
                    color: '#059669',
                    fontWeight: 'bold',
                },
            });
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
            queryClient.invalidateQueries({
                queryKey: ['workspace', data.$id],
            });
        },
        onError: () => {
            toast.error(`${t('Server.invite_fail')}`, {
                style: {
                    color: '#e11d48',
                    fontWeight: 'bold',
                },
            });
        },
    });

    return mutation;
};

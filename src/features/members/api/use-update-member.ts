import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useTranslations } from 'next-intl';

type ResponseType = InferResponseType<
    (typeof client.api.members)[':memberId']['$patch'],
    200
>;
type RequestType = InferRequestType<
    (typeof client.api.members)[':memberId']['$patch']
>;

export const useUpdateMember = () => {
    const queryClient = useQueryClient();
    const t = useTranslations('MembersPage');

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param, json }) => {
            const response = await client.api.members[':memberId']['$patch']({
                param,
                json,
            });

            if (!response.ok) {
                throw new Error('Failed to update member');
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success(`${t('Server.member_success')}`, {
                style: {
                    color: '#059669',
                    fontWeight: 'bold',
                },
            });
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
        onError: () => {
            toast.error(`${t('Server.member_fail')}`, {
                style: {
                    color: '#e11d48',
                    fontWeight: 'bold',
                },
            });
        },
    });

    return mutation;
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { useTranslations } from 'next-intl';

import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>;

export const useLogout = () => {
    const router = useRouter();
    const t = useTranslations('Server');
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.auth.logout['$post']();

            if (!response.ok) {
                throw new Error('Failed to logout');
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success(`${t('logout.success')}`, {
                style: {
                    color: '#059669',
                    fontWeight: 'bold',
                },
            });
            router.refresh();
            queryClient.invalidateQueries();
        },
        onError: () => {
            toast.error(`${t('logout.fail')}`, {
                style: {
                    color: '#e11d48',
                    fontWeight: 'bold',
                },
            });
        },
    });

    return mutation;
};

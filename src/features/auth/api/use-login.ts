import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { client } from '@/lib/rpc';
import { toast } from 'sonner';

type ResponseType = InferResponseType<(typeof client.api.auth.login)['$post']>;
type RequestType = InferRequestType<(typeof client.api.auth.login)['$post']>;

export const useLogin = () => {
    const t = useTranslations('Server');
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.auth.login['$post']({ json });
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success(`${t('login.success')}`, {
                style: {
                    color: '#059669',
                    fontWeight: 'bold',
                },
            });
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ['current'] });
        },
        onError: () => {
            toast.error(`${t('login.fail')}`, {
                style: {
                    color: '#e11d48',
                    fontWeight: 'bold',
                },
            });
        },
    });

    return mutation;
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

type ResponseType = InferResponseType<
    (typeof client.api.auth.register)['$post']
>;
type RequestType = InferRequestType<(typeof client.api.auth.register)['$post']>;

export const useRegister = () => {
    const router = useRouter();
    const t = useTranslations('Server');
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.auth.register['$post']({ json });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success(`${t('register.success')}`, {
                style: {
                    color: '#059669',
                    fontWeight: 'bold',
                },
            });
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ['current'] });
        },
        onError: () => {
            toast.error(`${t('register.fail')}`, {
                style: {
                    color: '#e11d48',
                    fontWeight: 'bold',
                },
            });
        },
    });

    return mutation;
};

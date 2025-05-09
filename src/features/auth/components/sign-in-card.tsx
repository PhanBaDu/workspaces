'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashedSeparator } from '@/components/dashed-separator';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { makeLoginSchema } from '@/features/auth/schema';
import { useLogin } from '@/features/auth/api/use-login';
import { signUpWithGithub, signUpWithGoogle } from '@/lib/server/oauth';
import { useTranslations } from 'next-intl';

export default function SignInCard() {
    const { mutate, isPending } = useLogin();
    const t = useTranslations('AuthPage');

    const schema = makeLoginSchema(t);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        mutate({ json: values });
    };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none rounded-lg z-10">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl uppercase font-semibold">
                    {t('signIn.title')}
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DashedSeparator />
            </div>
            {/* SIGN IN FORM */}
            <CardContent className="p-7">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            disabled={isPending}
                                            placeholder={`${t('signIn.email')}`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isPending}
                                            placeholder={`${t(
                                                'signIn.password',
                                            )}`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            className="w-full uppercase"
                            disabled={isPending}
                            size={'lg'}
                        >
                            {`${t('signIn.submit')}`}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DashedSeparator />
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button
                    disabled={isPending}
                    onClick={() => signUpWithGoogle()}
                    variant={'secondary'}
                    size={'lg'}
                    className="w-full"
                >
                    <FcGoogle className="size-5" />
                    {t('google')}
                </Button>
                <Button
                    disabled={isPending}
                    onClick={() => signUpWithGithub()}
                    variant={'secondary'}
                    size={'lg'}
                    className="w-full"
                >
                    <FaGithub className="size-5" />
                    {t('github')}
                </Button>
            </CardContent>
            <div className="px-7">
                <DashedSeparator />
            </div>
            <CardContent className="p-7 text-sm flex items-center justify-center">
                <p>{t('signIn.sign-desc')}</p>
                <Link className="text-blue-700" href={'/sign-up'}>
                    &nbsp;{t('signIn.href')}
                </Link>
            </CardContent>
        </Card>
    );
}

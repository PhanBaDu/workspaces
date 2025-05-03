'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { DashedSeparator } from '@/components/dashed-separator';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { makeRegisterSchema } from '@/features/auth/schema';
import { useRegister } from '@/features/auth/api/use-register';
import { useTranslations } from 'next-intl';

export default function SignUpCard() {
    const { mutate, isPending } = useRegister();
    const t = useTranslations('AuthPage');

    const schema = makeRegisterSchema(t);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        mutate({ json: values });
    };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none rounded-md">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl uppercase font-semibold">
                    {t('signUp.title')}
                </CardTitle>
                <CardDescription>
                    {t('signUp.desc-1')}{' '}
                    <Link href={'/privacy'}>
                        <span className="text-blue-700">
                            {' '}
                            {t('signUp.desc-2')}
                        </span>
                    </Link>{' '}
                    {t('signUp.desc-3')}{' '}
                    <Link href={'/terms'}>
                        <span className="text-blue-700">
                            {' '}
                            {t('signUp.desc-4')}
                        </span>
                    </Link>
                </CardDescription>
            </CardHeader>

            <div className="px-7">
                <DashedSeparator />
            </div>
            {/* SIGN UP FORM */}
            <CardContent className="p-7">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder={`${t('signUp.name')}`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder={`${t('signUp.email')}`}
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
                                            placeholder={`${t(
                                                'signUp.password',
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
                            {t('signUp.submit')}
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
                    variant={'outline'}
                    size={'lg'}
                    className="w-full"
                >
                    <FcGoogle className="size-5" />
                    {t('google')}
                </Button>
                <Button
                    disabled={isPending}
                    variant={'outline'}
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
                <p>{t('signUp.sign-desc')}</p>
                <Link className="text-blue-700" href={'/sign-in'}>
                    &nbsp;{t('signUp.href')}
                </Link>
            </CardContent>
        </Card>
    );
}

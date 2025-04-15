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
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { loginSchema } from '@/features/auth/schema';
import { useLogin } from '@/features/auth/api/use-login';

export default function SignInCard() {
    const { mutate } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate({ json: values });
    };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none rounded-md">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl uppercase font-semibold">Welcome back!</CardTitle>
            </CardHeader>
            <div className="px-7">
                <DashedSeparator />
            </div>
            {/* SIGN IN FORM */}
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter email address"
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
                                            placeholder="Enter password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-full" disabled={false} size={'lg'}>
                            LOGIN
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DashedSeparator />
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button disabled={false} variant={'outline'} size={'lg'} className="w-full">
                    <FcGoogle className="size-5" />
                    Login with Google
                </Button>
                <Button disabled={false} variant={'outline'} size={'lg'} className="w-full">
                    <FaGithub className="size-5" />
                    Login with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DashedSeparator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>Don&apos;t havev an account?</p>
                <Link className="text-blue-700" href={'/sign-up'}>
                    &nbsp;Sign Up
                </Link>
            </CardContent>
        </Card>
    );
}

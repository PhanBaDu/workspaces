'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { DashedSeparator } from '@/components/dashed-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const formSchema = z.object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().trim().email(),
    password: z.string().min(8, 'Minimum of 8 characters required'),
});

export default function SignUpCard() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log({ values });
    };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none rounded-md">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl uppercase font-semibold">SIGN UP</CardTitle>
                <CardDescription>
                    By signing up, you agree to our{' '}
                    <Link href={'/privacy'}>
                        <span className="text-blue-700">Privacy Policy</span>
                    </Link>{' '}
                    and{' '}
                    <Link href={'/terms'}>
                        <span className="text-blue-700">Terms of Service</span>
                    </Link>
                </CardDescription>
            </CardHeader>

            <div className="px-7">
                <DashedSeparator />
            </div>
            {/* SIGN UP FORM */}
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your name"
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
                <p>Already have an account?</p>
                <Link className="text-blue-700" href={'/sign-in'}>
                    &nbsp;Sign In
                </Link>
            </CardContent>
        </Card>
    );
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { makeCreateProjectSchema } from '@/features/projects/schema';
import { useCreateProject } from '@/features/projects/api/use-create-project';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { DashedSeparator } from '@/components/dashed-separator';
import { useTranslations } from 'next-intl';

interface CreateProjectFormProps {
    onCancel?: () => void;
}

export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { mutate, isPending } = useCreateProject();
    const inputRef = useRef<HTMLInputElement>(null);
    const t = useTranslations('Project');

    const schema = makeCreateProjectSchema(t);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            workspaceId: '',
            image: undefined,
        },
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        const finalValues = {
            ...values,
            workspaceId,
            image: values.image instanceof File ? values.image : '',
        };
        mutate(
            { form: finalValues },
            {
                onSuccess: ({ data }) => {
                    form.reset();
                    router.push(
                        `/workspaces/${workspaceId}/projects/${data.$id}?projectId=${data.$id}`,
                    );
                },
            },
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue('image', file);
        }
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="uppercase">{t('Client.title')}</CardTitle>
            </CardHeader>
            <div className="px-7">
                <DashedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('Client.label')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder={t(
                                                    'Client.placeholder',
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="image"
                                control={form.control}
                                render={({ field }) => (
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center gap-x-5">
                                            {field.value ? (
                                                <div className="size-[72px] relative rounded-md overflow-hidden">
                                                    <Image
                                                        src={
                                                            field.value instanceof
                                                            File
                                                                ? URL.createObjectURL(
                                                                      field.value,
                                                                  )
                                                                : field.value
                                                        }
                                                        alt="Logo"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <Avatar className="size-[72px] rounded-md">
                                                    <AvatarFallback className="rounded-md">
                                                        <ImageIcon
                                                            strokeWidth={2}
                                                            className="size-[36px] text-muted-foreground"
                                                        />
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col mb-1">
                                                <p className="text-sm text-muted-foreground">
                                                    {t('Client.img-desc-1')}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {t('Client.img-desc-2')}
                                                </p>
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept=".jpg, .png, .jpeg, .svg"
                                                    ref={inputRef}
                                                    disabled={isPending}
                                                    onChange={handleImageChange}
                                                />
                                                {field.value ? (
                                                    <Button
                                                        type="button"
                                                        disabled={isPending}
                                                        variant={'destructive'}
                                                        className="w-fit mt-2"
                                                        onClick={() => {
                                                            field.onChange(
                                                                null,
                                                            );
                                                            if (
                                                                inputRef.current
                                                            ) {
                                                                inputRef.current.value =
                                                                    '';
                                                            }
                                                        }}
                                                        size={'xs'}
                                                    >
                                                        {t('Client.remove')}
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        disabled={isPending}
                                                        variant={'teritary'}
                                                        className="w-fit mt-2"
                                                        onClick={() =>
                                                            inputRef.current?.click()
                                                        }
                                                        size={'xs'}
                                                    >
                                                        {t('Client.upload')}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <DashedSeparator className="py-7" />
                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                size={'lg'}
                                variant={'secondary'}
                                onClick={onCancel}
                                disabled={isPending}
                                className={cn(!onCancel && 'invisible')}
                            >
                                {t('Client.cancel')}
                            </Button>

                            <Button
                                disabled={isPending}
                                type="submit"
                                size={'lg'}
                            >
                                {t('Client.submit')}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

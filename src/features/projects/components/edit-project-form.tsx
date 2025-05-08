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
import { ArrowLeftIcon, ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Project } from '../types';
import { useConfirm } from '@/hooks/use-confirm';
import { useUpdateProject } from '../api/use-update-project';
import { DashedSeparator } from '@/components/dashed-separator';
import { useDeleteProject } from '@/features/projects/api/use-delete-project';
import { useTranslations } from 'next-intl';
import { makeUpdateProjectSchema } from '@/features/projects/schema';

interface EditProjectFormProps {
    onCancel?: () => void;
    initialValues: Project;
}

export const EditProjectForm = ({
    onCancel,
    initialValues,
}: EditProjectFormProps) => {
    const router = useRouter();
    const { mutate, isPending } = useUpdateProject();
    const t = useTranslations('Project');
    const { mutate: deleteProject } = useDeleteProject();

    const [DeleteDialog, confirmDelete] = useConfirm(
        `${t('Client.modal_title')}`,
        `${t('Client.modal_desc')}`,
        'destructive',
    );
    const schema = makeUpdateProjectSchema(t);

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? '',
        },
    });

    const handleDelete = async () => {
        const ok = await confirmDelete();

        if (!ok) return;

        deleteProject(
            { param: { projectId: initialValues.$id } },
            {
                onSuccess: () => {
                    router.push(`/workspaces/${initialValues.workspaceId}`);
                },
            },
        );
    };

    const onSubmit = (values: z.infer<typeof schema>) => {
        const finalValues = {
            ...values,
            image:
                values.image instanceof File
                    ? values.image
                    : initialValues.imageUrl,
        };
        mutate({
            form: finalValues,
            param: { projectId: initialValues.$id },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue('image', file);
        }
    };

    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDialog />
            <Card className="w-full h-full border-none shadow-none">
                <CardHeader className="flex flex-row items-center justify-between gap-x-4 p-7 space-y-0">
                    <Button
                        size={'sm'}
                        variant={'secondary'}
                        onClick={
                            onCancel
                                ? onCancel
                                : () =>
                                      router.push(
                                          `/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`,
                                      )
                        }
                    >
                        <ArrowLeftIcon className="size-4" />
                        {t('Client.back')}
                    </Button>
                    <CardTitle className="uppercase">
                        {t('Client.edit_title')}
                    </CardTitle>
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
                                                            <ImageIcon className="size-[36px] text-muted-foreground" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className="flex flex-col mb-1">
                                                    <p className="text-sm">
                                                        {t('Client.img-desc-1')}
                                                    </p>
                                                    <p className="text-sm to-muted-foreground">
                                                        {t('Client.img-desc-2')}
                                                    </p>
                                                    <input
                                                        type="file"
                                                        hidden
                                                        accept=".jpg, .png, .jpeg, .svg"
                                                        ref={inputRef}
                                                        disabled={isPending}
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                    />
                                                    {field.value ? (
                                                        <Button
                                                            type="button"
                                                            disabled={isPending}
                                                            variant={
                                                                'destructive'
                                                            }
                                                            className="w-fit mt-2"
                                                            onClick={() => {
                                                                field.onChange(
                                                                    '',
                                                                );
                                                                if (
                                                                    inputRef.current
                                                                ) {
                                                                    inputRef.current.value =
                                                                        '';
                                                                    initialValues.imageUrl =
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
                                    Cancel
                                </Button>

                                <Button
                                    disabled={isPending}
                                    type="submit"
                                    size={'lg'}
                                >
                                    {t('Client.edit_submit')}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">{t('Client.danger')}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t('Client.danger_desc')}
                        </p>
                        <DashedSeparator className="py-7" />

                        <Button
                            className="mt-6 w-fit ml-auto"
                            size={'sm'}
                            variant={'destructive'}
                            type="button"
                            disabled={isPending}
                            onClick={handleDelete}
                        >
                            {t('Client.danger_button')}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

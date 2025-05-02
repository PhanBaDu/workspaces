'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { makeCreateWorkspaceSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DashedSeparator } from '@/components/dashed-separator';
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
import { useCreateWorkspace } from '@/features/workspaces/api/use-create-workspace';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface CreateWorkspaceFormProps {
    onCancel?: () => void;
}

export default function CreateWorkspaceForm({
    onCancel,
}: CreateWorkspaceFormProps) {
    const router = useRouter();
    const t = useTranslations('WorkspacePage');
    const { mutate, isPending } = useCreateWorkspace();

    const inputRef = useRef<HTMLInputElement>(null);
    const schema = useMemo(() => makeCreateWorkspaceSchema(t), [t]);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : '',
        };
        mutate(
            { form: finalValues },
            {
                onSuccess: ({ data }) => {
                    router.push(`/workspaces/${data.$id}`);
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
                <CardTitle className="text-xl font-semibold uppercase">
                    {t('CreatePage.title')}
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
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('CreatePage.label')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={t(
                                                    'CreatePage.placeholder',
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
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
                                                            size={36}
                                                            strokeWidth={1.7}
                                                            className="text-muted-foreground"
                                                        />
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col mb-1">
                                                <p className="text-sm text-muted-foreground">
                                                    {t('CreatePage.img-desc-1')}
                                                </p>
                                                <p className="text-sm to-muted-foreground text-muted-foreground">
                                                    {t('CreatePage.img-desc-2')}
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
                                                        size={'xs'}
                                                        className="w-fit mt-2"
                                                        onClick={() => {
                                                            field.onChange(
                                                                null,
                                                            );
                                                            if (
                                                                inputRef.current
                                                            )
                                                                inputRef.current.value =
                                                                    '';
                                                        }}
                                                    >
                                                        {t('CreatePage.remove')}
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        disabled={isPending}
                                                        variant={'teritary'}
                                                        size={'xs'}
                                                        className="w-fit mt-2 rounded-md"
                                                        onClick={() =>
                                                            inputRef.current?.click()
                                                        }
                                                    >
                                                        {t('CreatePage.upload')}
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
                                {t('CreatePage.cancel')}
                            </Button>
                            <Button
                                type="submit"
                                size={'lg'}
                                disabled={isPending}
                            >
                                {t('CreatePage.submit')}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

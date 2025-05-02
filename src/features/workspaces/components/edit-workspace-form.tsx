'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { makeUpdateWorkspaceSchema } from '../schemas';
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
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeftIcon, CopyIcon, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Workspace } from '@/features/workspaces/types';
import { useRouter } from 'next/navigation';
import { useUpdateWorkspace } from '@/features/workspaces/api/use-update-workspace';
import { useConfirm } from '@/hooks/use-confirm';
import { useDeleteWorkspace } from '@/features/workspaces/api/use-delete-workspace';
import { toast } from 'sonner';
import { useResetInviteCode } from '@/features/workspaces/api/use-reset-invite-code';
import { useTranslations } from 'next-intl';

interface EditWorkspaceFormProps {
    onCancel?: () => void;
    initialValues: Workspace;
}

export default function EditWorkspaceForm({
    onCancel,
    initialValues,
}: EditWorkspaceFormProps) {
    const t = useTranslations('SettingsPage');
    const router = useRouter();
    const { mutate, isPending } = useUpdateWorkspace();
    const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
        useDeleteWorkspace();
    const { mutate: resetInviteCode, isPending: isResettingInviteCode } =
        useResetInviteCode();

    const [DeleteDialog, confirmDelete] = useConfirm(
        `${t('Client.danger_modal_title')}`,
        `${t('Client.danger_modal_desc')}`,
        'destructive',
    );

    const [ResetDialog, confirmReset] = useConfirm(
        `${t('Client.invite_modal_title')}`,
        `${t('Client.invite_modal_desc')}`,
        'destructive',
    );

    const inputRef = useRef<HTMLInputElement>(null);

    const schema = useMemo(() => makeUpdateWorkspaceSchema(t), [t]);

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

        deleteWorkspace(
            { param: { workspaceId: initialValues.$id } },
            {
                onSuccess: () => {
                    window.location.href = `/`;
                },
            },
        );
    };

    const onSubmit = (values: z.infer<typeof schema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : '',
        };
        mutate({
            form: finalValues,
            param: { workspaceId: initialValues.$id },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue('image', file);
        }
    };

    const handleResetInviteCode = async () => {
        const ok = await confirmReset();

        if (!ok) return;

        resetInviteCode({ param: { workspaceId: initialValues.$id } });
    };

    const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

    const handleCopyInviteLink = () => {
        navigator.clipboard
            .writeText(fullInviteLink)
            .then(() => toast.success(`${t('Client.copy_toast')}`));
    };

    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDialog />
            <ResetDialog />
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
                                          `/workspaces/${initialValues.$id}`,
                                      )
                        }
                    >
                        <ArrowLeftIcon className="size-4" />
                        {t('Client.back')}
                    </Button>
                    <CardTitle className="uppercase">
                        {t('Client.title')}
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
                                                {t('Client.label')}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
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
                                                            <ImageIcon className="size-[36px] text-muted-foreground" />
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
                                                            {t('Client.remove')}
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            type="button"
                                                            disabled={isPending}
                                                            variant={'teritary'}
                                                            size={'xs'}
                                                            className="w-fit mt-2"
                                                            onClick={() =>
                                                                inputRef.current?.click()
                                                            }
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
                                    type="submit"
                                    size={'lg'}
                                    onClick={onCancel}
                                    disabled={isPending}
                                >
                                    {t('Client.submit')}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">{t('Client.invite')}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t('Client.invite_desc')}
                        </p>
                        <div className="mt-4">
                            <div className="flex items-center gap-x-2">
                                <Input disabled value={fullInviteLink} />
                                <Button
                                    onClick={handleCopyInviteLink}
                                    variant={'secondary'}
                                    className="size-12"
                                >
                                    <CopyIcon />
                                </Button>
                            </div>
                        </div>
                        <DashedSeparator className="py-7" />
                        <Button
                            className="mt-6 w-fit ml-auto"
                            size={'sm'}
                            variant={'outline'}
                            type="button"
                            disabled={isPending || isResettingInviteCode}
                            onClick={handleResetInviteCode}
                        >
                            {t('Client.invite_reset')}
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">
                            {t('Client.danger_title')}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {t('Client.danger_desc')}
                        </p>
                        <DashedSeparator className="py-7" />

                        <Button
                            className="mt-6 w-fit ml-auto"
                            size={'sm'}
                            variant={'destructive'}
                            type="button"
                            disabled={isDeletingWorkspace || isPending}
                            onClick={handleDelete}
                        >
                            {t('Client.danger_button')}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

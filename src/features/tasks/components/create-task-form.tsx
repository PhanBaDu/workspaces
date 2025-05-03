'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { cn } from '@/lib/utils';
import { makeCreateTaskSchema } from '../schemas';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { DashedSeparator } from '@/components/dashed-separator';
import { useCreateTask } from '@/features/tasks/api/use-create-task';
import { DatePicker } from '@/components/date-picker';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { MemberAvatar } from '@/features/members/components/members-avatar';
import { TaskStatus } from '@/features/tasks/types';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { useTranslations } from 'next-intl';
interface CreateTaskFormProps {
    onCancel?: () => void;
    projectOptions: { id: string; name: string; imageUrl: string }[];
    memberOptions: { id: string; name: string }[];
}

export const CreateTaskForm = ({
    onCancel,
    projectOptions,
    memberOptions,
}: CreateTaskFormProps) => {
    const workspaceId = useWorkspaceId();
    const { mutate, isPending } = useCreateTask();
    const t = useTranslations('Task.Client');
    const x = useTranslations('TaskForm');

    const schema = makeCreateTaskSchema(x);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            workspaceId,
        },
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        mutate(
            { json: { ...values, workspaceId } },
            {
                onSuccess: () => {
                    form.reset();
                    onCancel?.();
                },
            },
        );
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="uppercase">{t('new_title')}</CardTitle>
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
                                            {t('action_edit_label_name')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder={t(
                                                    'action_edit_pla_name',
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="dueDate"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('due_date_label')}
                                        </FormLabel>
                                        <FormControl>
                                            {/* TODO: Date Picker */}
                                            <DatePicker
                                                {...field}
                                                placeholder={t('due_date_pla')}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="assigneeId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('due_date_ass')}
                                        </FormLabel>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-12">
                                                    <SelectValue
                                                        placeholder={t(
                                                            'due_date_ass_pla',
                                                        )}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage />
                                            <SelectContent>
                                                {memberOptions.map((member) => (
                                                    <SelectItem
                                                        key={member.id}
                                                        value={member.id}
                                                    >
                                                        <div className="flex items-center gap-x-2">
                                                            <MemberAvatar
                                                                className="size-6"
                                                                name={
                                                                    member.name
                                                                }
                                                            />
                                                            {member.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="status"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('status_label')}
                                        </FormLabel>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-12">
                                                    <SelectValue
                                                        placeholder={t(
                                                            'status_pla',
                                                        )}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage />
                                            <SelectContent>
                                                <SelectItem
                                                    value={TaskStatus.BACKLOG}
                                                >
                                                    {t('BACKLOG')}
                                                </SelectItem>
                                                <SelectItem
                                                    value={
                                                        TaskStatus.IN_PROGRESS
                                                    }
                                                >
                                                    {' '}
                                                    {t('IN_PROGRESS')}
                                                </SelectItem>
                                                <SelectItem
                                                    value={TaskStatus.IN_REVIEW}
                                                >
                                                    {' '}
                                                    {t('IN_REVIEW')}
                                                </SelectItem>
                                                <SelectItem
                                                    value={TaskStatus.TODO}
                                                >
                                                    {' '}
                                                    {t('TODO')}
                                                </SelectItem>
                                                <SelectItem
                                                    value={TaskStatus.DONE}
                                                >
                                                    {' '}
                                                    {t('DONE')}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="projectId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('project_label')}
                                        </FormLabel>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-12">
                                                    <SelectValue
                                                        placeholder={t(
                                                            'project_pla',
                                                        )}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage />
                                            <SelectContent>
                                                {projectOptions.map(
                                                    (project) => (
                                                        <SelectItem
                                                            key={project.id}
                                                            value={project.id}
                                                        >
                                                            <div className="flex items-center gap-x-2">
                                                                <ProjectAvatar
                                                                    className="size-6"
                                                                    name={
                                                                        project.name
                                                                    }
                                                                    image={
                                                                        project.imageUrl
                                                                    }
                                                                />
                                                                {project.name}
                                                            </div>
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
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
                                {t('cancel')}
                            </Button>

                            <Button
                                disabled={isPending}
                                type="submit"
                                size={'lg'}
                            >
                                {t('create')}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

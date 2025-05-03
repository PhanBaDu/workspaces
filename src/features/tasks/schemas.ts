import { TaskStatus } from '@/features/tasks/types';
import { z } from 'zod';

export const createTaskSchema = z.object({
    name: z.string().trim().min(1, 'Required'),
    status: z.nativeEnum(TaskStatus, { required_error: 'Required' }),
    workspaceId: z.string().trim().min(1, 'Required'),
    projectId: z.string().trim().min(1, 'Required'),
    dueDate: z.coerce.date(),
    assigneeId: z.string().trim().min(1, 'Required'),
    description: z.string().optional(),
});

export const makeCreateTaskSchema = (t: (key: string) => string) =>
    z.object({
        name: z
            .string({ required_error: t('Client.Required') })
            .trim()
            .min(1, t('Client.Required')),
        status: z.nativeEnum(TaskStatus, {
            required_error: t('Client.Required'),
        }),
        workspaceId: z.string().trim().min(1, t('Client.Required')),
        projectId: z
            .string({ required_error: t('Client.Required') })
            .trim()
            .min(1, t('Client.Required')),
        dueDate: z.coerce.date({
            errorMap: ({ code }, { defaultError }) => {
                if (code == 'invalid_date')
                    return { message: t('Client.Required') };
                return { message: defaultError };
            },
        }),
        assigneeId: z
            .string({ required_error: t('Client.Required') })
            .trim()
            .min(1, t('Client.Required')),
        description: z
            .string({ required_error: t('Client.Required') })
            .optional(),
    });

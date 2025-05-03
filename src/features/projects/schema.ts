import { z } from 'zod';

export const createProjectSchema = z.object({
    name: z.string().trim().min(1, 'Required'),
    image: z
        .union([
            z.instanceof(File),
            z.string().transform((value) => (value === '' ? undefined : value)),
        ])
        .optional(),
    workspaceId: z.string(),
});

export const makeCreateProjectSchema = (t: (key: string) => string) =>
    z.object({
        name: z.string().trim().min(1, t('Client.required')),
        image: z
            .union([
                z.instanceof(File),
                z
                    .string()
                    .transform((value) => (value === '' ? undefined : value)),
            ])
            .optional(),
        workspaceId: z.string(),
    });

export const updateProjectSchema = z.object({
    name: z.string().trim().min(1, 'Minimum 1 character required').optional(),
    image: z
        .union([
            z.instanceof(File),
            z.string().transform((value) => (value === '' ? undefined : value)),
        ])
        .optional(),
});

export const makeUpdateProjectSchema = (t: (key: string) => string) =>
    z.object({
        name: z.string().trim().min(1, t('Client.minimum')).optional(),
        image: z
            .union([
                z.instanceof(File),
                z
                    .string()
                    .transform((value) => (value === '' ? undefined : value)),
            ])
            .optional(),
    });

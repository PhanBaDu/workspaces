import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Required'),
});

export const makeLoginSchema = (t: (key: string) => string) =>
    z.object({
        email: z.string().email(t('signIn.email-invalid')),
        password: z.string().min(1, t('signIn.required')),
    });

export const registerSchema = z.object({
    name: z.string().trim().min(1, 'Required'),
    email: z.string().email(),
    password: z.string().min(8, 'Minimum of 8 characters required'),
});

export const makeRegisterSchema = (t: (key: string) => string) =>
    z.object({
        name: z.string().trim().min(1, t('signUp.name-invalid')),
        email: z.string().email(t('signUp.email-invalid')),
        password: z.string().min(8, t('signUp.password-invalid')),
    });

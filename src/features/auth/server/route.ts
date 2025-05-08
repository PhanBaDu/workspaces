import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { loginSchema, registerSchema } from '@/features/auth/schema';
import { createAdminClient } from '@/lib/appwrite';
import { ID } from 'node-appwrite';
import { deleteCookie, setCookie } from 'hono/cookie';
import { AUTH_COOKIE } from '@/features/auth/constants';
import { sessionMiddleware } from '@/lib/session-middleware';

const app = new Hono()
    .get('/current', sessionMiddleware, async (c) => {
        const user = c.get('user');

        return c.json({
            data: user,
        });
    })
    .post('/login', zValidator('json', loginSchema), async (c) => {
        const { email, password } = c.req.valid('json');
        try {
            const { account } = await createAdminClient();
            const session = await account.createEmailPasswordSession(
                email,
                password,
            );

            setCookie(c, AUTH_COOKIE, session.secret, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 30,
            });

            return c.json({ success: true });
        } catch (err: unknown) {
            // Kiểm tra nếu lỗi là một đối tượng với code và message từ Appwrite
            if (err instanceof Object && 'code' in err && 'message' in err) {
                // Kiểm tra mã lỗi từ Appwrite (ví dụ 401 là lỗi xác thực)
                if (err.code === 401) {
                    return c.json(
                        {
                            success: false,
                            message: 'Invalid email or password',
                        },
                        401,
                    );
                }
            }

            // Các lỗi khác trả về 500
            return c.json(
                { success: false, message: 'An error occurred' },
                500,
            );
        }
    })
    .post('/register', zValidator('json', registerSchema), async (c) => {
        const { name, email, password } = c.req.valid('json');

        const { account } = await createAdminClient();
        try {
            await account.create(ID.unique(), email, password, name);
        } catch (err: unknown) {
            // Kiểm tra nếu err là một đối tượng có thuộc tính code và type
            if (err instanceof Object && 'code' in err && 'type' in err) {
                // Kiểm tra nếu lỗi có code 400 và loại lỗi là 'user_email_already_exists'
                if (
                    err.code === 400 &&
                    err.type === 'user_email_already_exists'
                ) {
                    return c.json(
                        { success: false, message: 'Email already exists.' },
                        400,
                    );
                }
            }

            // Các lỗi khác trả về thông báo chung
            return c.json(
                {
                    success: false,
                    message:
                        'There was an error processing your request. Please check the inputs and try again.',
                },
                400,
            );
        }

        const session = await account.createEmailPasswordSession(
            email,
            password,
        );

        setCookie(c, AUTH_COOKIE, session.secret, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
        });

        return c.json({ success: true });
    })
    .post('/logout', sessionMiddleware, async (c) => {
        const account = c.get('account');
        deleteCookie(c, AUTH_COOKIE);
        await account.deleteSession('current');

        return c.json({ success: true });
    });

export default app;

import { DATABASE_ID, IMAGE_BUCKET_ID, WORKSPACES_ID } from '@/config';
import { createWorkspaceSchema } from '@/features/workspaces/schemas';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { ID } from 'node-appwrite';

const app = new Hono()
    .get('/', sessionMiddleware, async (c) => {
        const databases = c.get('databases');

        const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACES_ID);

        return c.json({ data: workspaces });
    })
    .post('/', zValidator('form', createWorkspaceSchema), sessionMiddleware, async (c) => {
        const databases = c.get('databases');
        const storage = c.get('storage');
        const user = c.get('user');

        const { name, image } = c.req.valid('form');

        let uploadedImageUrl = '';
        if (image instanceof File) {
            const file = await storage.createFile(IMAGE_BUCKET_ID, ID.unique(), image);

            const arrayBuffer = await storage.getFileView(IMAGE_BUCKET_ID, file.$id);

            uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString(
                'base64',
            )}`;
        }

        const workspace = await databases.createDocument(DATABASE_ID, WORKSPACES_ID, ID.unique(), {
            userId: user.$id,
            name,
            imageUrl: uploadedImageUrl,
        });

        return c.json({ data: workspace });
    });

export default app;

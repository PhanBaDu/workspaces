import {
    ADMIN_ID,
    DATABASE_ID,
    PROJECTS_ID,
    TASKS_ID,
    WORKSPACES_ID,
} from '@/config';
import { Admin } from '@/features/admin/types';
import { Project } from '@/features/projects/types';
import { Task } from '@/features/tasks/types';
import { Workspace } from '@/features/workspaces/types';
import { createAdminClient } from '@/lib/appwrite';
import { sessionMiddleware } from '@/lib/session-middleware';
import { Hono } from 'hono';
import { Query } from 'node-appwrite';
import { endOfMonth, startOfMonth } from 'date-fns';
const app = new Hono()
    .get('/isAdmin', sessionMiddleware, async (c) => {
        const user = c.get('user');
        const databases = c.get('databases');

        const isAdmin = await databases.listDocuments<Admin>(
            DATABASE_ID,
            ADMIN_ID,
            [Query.equal('userId', user.$id)],
        );

        return c.json({ data: isAdmin });
    })
    .get('/system/analytics', sessionMiddleware, async (c) => {
        const user = c.get('user');
        const databases = c.get('databases');

        const isAdmin = await databases.listDocuments<Admin>(
            DATABASE_ID,
            ADMIN_ID,
            [Query.equal('userId', user.$id)],
        );

        if (!isAdmin) return c.json({ error: 'You do not have access' }, 401);

        if (isAdmin && isAdmin.total <= 0)
            return c.json({ error: 'You do not have access' }, 401);

        // All user
        const { users } = await createAdminClient();
        const resultUsers = await users.list();
        const usersWorkspaces = {
            service: 'users',
            visitors: resultUsers.total,
            fill: 'hsl(var(--chart-1))',
        };

        // All workspace
        const workspaces = await databases.listDocuments<Workspace>(
            DATABASE_ID,
            WORKSPACES_ID,
        );
        const chartWorkspaces = {
            service: 'workspaces',
            visitors: workspaces.total,
            fill: 'hsl(var(--chart-2))',
        };

        // All Project
        const projects = await databases.listDocuments<Project>(
            DATABASE_ID,
            PROJECTS_ID,
        );
        const projectsWorkspaces = {
            service: 'projects',
            visitors: projects.total,
            fill: 'hsl(var(--chart-3))',
        };

        // ALl Tasks
        const tasks = await databases.listDocuments<Task>(
            DATABASE_ID,
            TASKS_ID,
        );
        const tasksWorkspaces = {
            service: 'tasks',
            visitors: tasks.total,
            fill: 'hsl(var(--chart-4))',
        };

        return c.json({
            data: {
                users: [usersWorkspaces],
                workspaces: [chartWorkspaces],
                projects: [projectsWorkspaces],
                tasks: [tasksWorkspaces],
            },
        });
    })
    .get('/system/analytics/tasks', sessionMiddleware, async (c) => {
        const user = c.get('user');
        const databases = c.get('databases');

        // Xác thực admin
        const isAdmin = await databases.listDocuments<Admin>(
            DATABASE_ID,
            ADMIN_ID,
            [Query.equal('userId', user.$id)],
        );

        if (!isAdmin || isAdmin.total <= 0)
            return c.json({ error: 'You do not have access' }, 401);

        // Đếm số lượng task theo từng trạng thái
        const statuses = [
            'BACKLOG',
            'TODO',
            'IN_PROGRESS',
            'IN_REVIEW',
            'DONE',
        ];

        const statusCounts: Record<string, number> = {};

        for (const status of statuses) {
            const res = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
                Query.equal('status', status),
            ]);
            statusCounts[status] = res.total;
        }

        const totalTasks = Object.values(statusCounts).reduce(
            (sum, n) => sum + n,
            0,
        );

        return c.json({
            data: {
                ...statusCounts,
                total: totalTasks,
            },
        });
    })
    .get('/system/analytics/all', sessionMiddleware, async (c) => {
        const user = c.get('user');
        const databases = c.get('databases');

        const isAdmin = await databases.listDocuments(DATABASE_ID, ADMIN_ID, [
            Query.equal('userId', user.$id),
        ]);

        if (!isAdmin || isAdmin.total <= 0)
            return c.json({ error: 'You do not have access' }, 401);

        const now = new Date();
        const year = now.getFullYear();

        const monthlyCounts = await Promise.all(
            Array.from({ length: 12 }, async (_, i) => {
                const start = startOfMonth(new Date(year, i));
                const end = endOfMonth(new Date(year, i));

                const [workspaceDocs, projectDocs, taskDocs] =
                    await Promise.all([
                        databases.listDocuments(DATABASE_ID, WORKSPACES_ID, [
                            Query.greaterThanEqual(
                                '$createdAt',
                                start.toISOString(),
                            ),
                            Query.lessThanEqual(
                                '$createdAt',
                                end.toISOString(),
                            ),
                        ]),
                        databases.listDocuments(DATABASE_ID, PROJECTS_ID, [
                            Query.greaterThanEqual(
                                '$createdAt',
                                start.toISOString(),
                            ),
                            Query.lessThanEqual(
                                '$createdAt',
                                end.toISOString(),
                            ),
                        ]),
                        databases.listDocuments(DATABASE_ID, TASKS_ID, [
                            Query.greaterThanEqual(
                                '$createdAt',
                                start.toISOString(),
                            ),
                            Query.lessThanEqual(
                                '$createdAt',
                                end.toISOString(),
                            ),
                        ]),
                    ]);

                return {
                    month: start.toLocaleString('default', { month: 'long' }),
                    workspaces: workspaceDocs.total,
                    projects: projectDocs.total,
                    tasks: taskDocs.total,
                };
            }),
        );

        return c.json({ data: monthlyCounts });
    });

export default app;

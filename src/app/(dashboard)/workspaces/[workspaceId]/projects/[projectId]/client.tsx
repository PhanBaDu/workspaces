'use client';

import { Button } from '@/components/ui/button';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import TaskViewSwitcher from '@/features/tasks/components/task-view-switcher';
import { PencilRuler } from 'lucide-react';
import Link from 'next/link';
import { useProjectId } from '@/features/projects/hooks/use-project-id';
import { useGetProject } from '@/features/projects/api/use-get-project';
import PageLoader from '@/components/page-loader';
import PageError from '@/components/page-error';
import { useGetProjectAnalytics } from '@/features/projects/api/use-get-project-analytics';
import Analytics from '@/components/analytics';
import { useTranslations } from 'next-intl';

export const ProjectIdClient = () => {
    const t = useTranslations('Project');
    const x = useTranslations('PageError.Client');

    const projectId = useProjectId();
    const { data: project, isLoading: isLoadingProject } = useGetProject({
        projectId: projectId,
    });
    const { data: analytics, isLoading: isLoadingAnalytics } =
        useGetProjectAnalytics({
            projectId,
        });

    const isLoading = isLoadingProject || isLoadingAnalytics;

    if (isLoading) return <PageLoader />;

    if (!project) return <PageError message={x('project_not_found')} />;

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between bg-card p-4 rounded-lg">
                <div className="flex items-center gap-x-2">
                    <ProjectAvatar
                        name={project.name}
                        image={project.imageUrl}
                        className="size-8"
                    />
                    <p className="text-lg font-semibold">{project.name}</p>
                </div>
                <div>
                    <Button variant={'secondary'} asChild>
                        <Link
                            href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
                        >
                            <PencilRuler className="size-4" />
                            {t('Client.edit_title')}
                        </Link>
                    </Button>
                </div>
            </div>
            {analytics ? <Analytics data={analytics} /> : null}
            <TaskViewSwitcher hideProjectFilter />
        </div>
    );
};

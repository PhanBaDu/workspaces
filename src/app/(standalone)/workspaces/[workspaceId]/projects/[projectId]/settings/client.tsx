'use client';

import PageError from '@/components/page-error';
import PageLoader from '@/components/page-loader';
import { useGetProject } from '@/features/projects/api/use-get-project';
import { EditProjectForm } from '@/features/projects/components/edit-project-form';
import { useProjectId } from '@/features/projects/hooks/use-project-id';
import { useTranslations } from 'next-intl';

export default function ProjectIdSetingsClient() {
    const projectId = useProjectId();
    const { data: initialValues, isLoading } = useGetProject({ projectId });
    const x = useTranslations('PageError.Client');
    if (isLoading) return <PageLoader />;

    if (!initialValues) return <PageError message={x('project_not_found')} />;

    return (
        <div className="w-full lg:max-w-xl">
            <EditProjectForm initialValues={initialValues} />
        </div>
    );
}

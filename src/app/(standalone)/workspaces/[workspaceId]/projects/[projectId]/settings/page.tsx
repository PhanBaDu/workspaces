import ProjectIdSetingsClient from '@/app/(standalone)/workspaces/[workspaceId]/projects/[projectId]/settings/client';
import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const ProjectIdSettingsPage = async () => {
    const user = await getCurrent();
    if (!user) redirect('/sign-in');

    return <ProjectIdSetingsClient />;
};

export default ProjectIdSettingsPage;

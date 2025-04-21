import { WorkspaceIdSettingsClient } from '@/app/(standalone)/workspaces/[workspaceId]/settings/client';
import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

export default async function WorkspaceIdSettingsPage() {
    const user = await getCurrent();
    if (!user) redirect('/sign-in');

    return <WorkspaceIdSettingsClient />;
}

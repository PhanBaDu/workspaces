'use client';

import PageError from '@/components/page-error';
import PageLoader from '@/components/page-loader';
import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info';
import JoinWorkspaceForm from '@/features/workspaces/components/join-workspace-form';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useTranslations } from 'next-intl';

export default function WorkspaceIdJoinClient() {
    const workspaceId = useWorkspaceId();
    const t = useTranslations('PageError.Client');
    const { data, isLoading } = useGetWorkspaceInfo({ workspaceId });

    if (isLoading) return <PageLoader />;

    if (!data) return <PageError message={t('member_not_found')} />;

    return (
        <div className="w-full lg:max-w-xl">
            <JoinWorkspaceForm initialValues={data} />
        </div>
    );
}

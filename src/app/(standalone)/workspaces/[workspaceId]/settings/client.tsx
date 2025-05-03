'use client';

import PageError from '@/components/page-error';
import PageLoader from '@/components/page-loader';
import { useGetMember } from '@/features/members/api/use-get-member';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import EditWorkspaceForm from '@/features/workspaces/components/edit-workspace-form';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useTranslations } from 'next-intl';

export const WorkspaceIdSettingsClient = () => {
    const workspaceId = useWorkspaceId();
    const t = useTranslations('Member.Client');
    const x = useTranslations('PageError.Client');
    const { data: initialValues, isLoading } = useGetWorkspace({
        workspaceId,
    });
    const { data: member, isLoading: isLoadingMember } = useGetMember({
        workspaceId,
    });

    if (isLoading || isLoadingMember) return <PageLoader />;

    if (!initialValues || !member)
        return <PageError message={x('project_not_found')} />;

    return (
        <div className="w-full lg:max-w-xl">
            {member?.member?.role === 'MEMBER' ? (
                <h1 className="mt-56 text-center text-xs lg:text-sm">
                    {t('isAdmin_1')}{' '}
                    <span className="text-primary font-bold underline">
                        {t('isAdmin_2')}
                    </span>{' '}
                    {t('isAdmin_3')}
                </h1>
            ) : (
                <EditWorkspaceForm initialValues={initialValues} />
            )}
        </div>
    );
};

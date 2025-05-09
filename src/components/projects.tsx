'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { CheckCheck, GitBranchPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Projects = () => {
    const pathname = usePathname();
    const t = useTranslations('Navbar');
    const workspaceId = useWorkspaceId();
    const { open } = useCreateProjectModal();
    const { data } = useGetProjects({ workspaceId });

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-sm uppercase font-semibold">
                    {t('Client.label_project')}
                </p>
                <GitBranchPlus
                    onClick={open}
                    size={18}
                    className="cursor-pointer hover:opacity-75 transition"
                />
            </div>
            <ScrollArea
                className={`h-[500px] w-full ${
                    data && data?.total > 11
                        ? 'hover:pr-4 transition-all duration-300'
                        : 'pr-0'
                }`}
            >
                {data?.documents.map((project) => {
                    const href = `/workspaces/${workspaceId}/projects/${project.$id}?projectId=${project.$id}`;
                    const isActive =
                        pathname + `?projectId=${project.$id}` === href;
                    return (
                        <Link href={href} key={project.$id}>
                            <Button
                                variant={isActive ? 'primary' : 'ghost'}
                                className={cn(
                                    'flex w-full items-center justify-between p-2.5 rounded-md transition cursor-pointer',
                                )}
                            >
                                <div className="flex items-center gap-2.5">
                                    <ProjectAvatar
                                        image={project.imageUrl}
                                        name={project.name}
                                        fallbackClassName={
                                            isActive
                                                ? 'bg-primary-foreground text-primary'
                                                : undefined
                                        }
                                    />
                                    <span className="truncate">
                                        {project.name}
                                    </span>
                                </div>
                                {isActive && <CheckCheck />}
                            </Button>
                        </Link>
                    );
                })}
            </ScrollArea>
        </div>
    );
};

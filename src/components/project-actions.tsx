import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PencilRuler, SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
interface ProjectActionsProps {
    workspaceId: string;
    projectId: string;
    children: React.ReactNode;
}
export default function ProjectActions({
    workspaceId,
    projectId,
    children,
}: ProjectActionsProps) {
    const t = useTranslations('Project.Client');
    const router = useRouter();

    const onOpenProject = () => {
        router.push(
            `/workspaces/${workspaceId}/projects/${projectId}?projectId=${projectId}`,
        );
    };
    const onOpenProjectSettings = () => {
        router.push(
            `/workspaces/${workspaceId}/projects/${projectId}/settings`,
        );
    };

    return (
        <div className="flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem
                        onClick={onOpenProject}
                        className="font-medium p-[10px] cursor-pointer flex items-center"
                    >
                        <SquareArrowOutUpRight className="size-4 stroke-2" />
                        {t('open_project')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onOpenProjectSettings}
                        className="font-medium p-[10px] cursor-pointer flex items-center"
                    >
                        <PencilRuler className="size-4 stroke-2" />
                        {t('open_project_update')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

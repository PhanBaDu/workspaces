import { DatePicker } from '@/components/date-picker';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useTaskFilters } from '@/features/tasks/hooks/use-task-filters';
import { TaskStatus } from '@/features/tasks/types';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { FolderIcon, ListCheckIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface DataFiltersProps {
    hideProjectFilter?: boolean;
}

export default function DataFilters({ hideProjectFilter }: DataFiltersProps) {
    const workspaceId = useWorkspaceId();
    const t = useTranslations('ProjectTasks');
    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
        workspaceId,
    });
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({
        workspaceId,
    });

    const isLoading = isLoadingProjects || isLoadingMembers;

    const projectOptions = projects?.documents.map((project) => ({
        value: project.$id,
        label: project.name,
    }));

    const memberOptions = members?.documents.map((member) => ({
        value: member.$id,
        label: member.name,
    }));

    const [{ status, assigneeId, dueDate, projectId }, setFilters] =
        useTaskFilters();
    const onStatusChange = (value: string) => {
        setFilters({ status: value === 'all' ? null : (value as TaskStatus) });
    };

    const onAssigneeChange = (value: string) => {
        setFilters({ assigneeId: value === 'all' ? null : (value as string) });
    };

    const onProjectChange = (value: string) => {
        setFilters({ projectId: value === 'all' ? null : (value as string) });
    };

    if (isLoading) return null;

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Select
                defaultValue={status ?? undefined}
                onValueChange={(value) => onStatusChange(value)}
            >
                <SelectTrigger
                    className="w-full
                 lg:w-auto h-8 shadow-none"
                >
                    <div className="flex items-center pr-2 text-secondary-foreground">
                        <ListCheckIcon className="size-4 h-4 w-4 mr-2" />
                        <SelectValue
                            placeholder={`${t('Client.all_status')}`}
                        />
                    </div>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        {t('Client.all_status')}
                    </SelectItem>
                    <SelectSeparator />
                    <SelectItem value={TaskStatus.BACKLOG}>
                        {t('Client.backlog_status')}
                    </SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>
                        {t('Client.progress_status')}
                    </SelectItem>
                    <SelectItem value={TaskStatus.IN_REVIEW}>
                        {t('Client.review_status')}
                    </SelectItem>
                    <SelectItem value={TaskStatus.TODO}>
                        {t('Client.todo_status')}
                    </SelectItem>
                    <SelectItem value={TaskStatus.DONE}>
                        {t('Client.done_status')}
                    </SelectItem>
                </SelectContent>
            </Select>
            <Select
                defaultValue={assigneeId ?? undefined}
                onValueChange={(value) => onAssigneeChange(value)}
            >
                <SelectTrigger
                    className="w-full
                 lg:w-auto h-8 shadow-none"
                >
                    <div className="flex items-center pr-2 text-secondary-foreground">
                        <UserIcon className="size-4 h-4 w-4 mr-2" />
                        <SelectValue
                            placeholder={`${t('Client.all_assignee')}`}
                        />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">
                        {t('Client.all_assignee')}
                    </SelectItem>
                    <SelectSeparator />
                    {memberOptions?.map((member) => (
                        <SelectItem key={member.value} value={member.value}>
                            {member.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {!hideProjectFilter && (
                <Select
                    defaultValue={projectId ?? undefined}
                    onValueChange={(value) => onProjectChange(value)}
                >
                    <SelectTrigger
                        className="w-full
                 lg:w-auto h-8 shadow-none"
                    >
                        <div className="flex items-center pr-2 text-secondary-foreground">
                            <FolderIcon className="size-4 h-4 w-4 mr-2" />
                            <SelectValue
                                placeholder={t('Client.all_project')}
                            />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            {t('Client.all_project')}
                        </SelectItem>
                        <SelectSeparator />
                        {projectOptions?.map((project) => (
                            <SelectItem
                                key={project.value}
                                value={project.value}
                            >
                                {project.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
            <DatePicker
                placeholder={t('Client.due_date')}
                className="w-full lg:w-auto h-8 text-secondary-foreground bg-card"
                value={dueDate ? new Date(dueDate) : undefined}
                onChange={(date) =>
                    setFilters({ dueDate: date ? date.toISOString() : null })
                }
            />
        </div>
    );
}

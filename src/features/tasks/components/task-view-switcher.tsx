'use client';
import { DashedSeparator } from '@/components/dashed-separator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal';
import { Loader, PlusIcon } from 'lucide-react';
import { useGetTasks } from '@/features/tasks/api/use-get-tasks';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useQueryState } from 'nuqs';
import DataFilters from '@/features/tasks/components/data-filters';
import { useTaskFilters } from '@/features/tasks/hooks/use-task-filters';
import { DataTable } from '@/features/tasks/components/data-table';
import { columns } from '@/features/tasks/components/columns';
import DataKanban from '@/features/tasks/components/data-kanban';
import { useCallback } from 'react';
import { TaskStatus } from '@/features/tasks/types';
import { useBulkUpdateTasks } from '@/features/tasks/api/use-bulk-update-tasks';
import DataCanlendar from '@/features/tasks/components/data-calendar';
import { useProjectId } from '@/features/projects/hooks/use-project-id';

interface TaskViewSwitcherProps {
    hideProjectFilter?: boolean;
}

const TaskViewSwitcher = ({ hideProjectFilter }: TaskViewSwitcherProps) => {
    const { mutate: bulkUpdate } = useBulkUpdateTasks();

    const [{ status, assigneeId, dueDate, projectId, search }] =
        useTaskFilters();

    const [view, setView] = useQueryState('task-view', {
        defaultValue: 'table',
    });

    const workspaceId = useWorkspaceId();
    const paramProjectId = useProjectId();
    const { open } = useCreateTaskModal();
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
        workspaceId,
        status,
        assigneeId,
        dueDate,
        projectId: paramProjectId || projectId,
        search,
    });

    const onKanbanChange = useCallback(
        (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
            bulkUpdate({ json: { tasks } });
        },
        [bulkUpdate],
    );

    return (
        <Tabs
            defaultValue={view}
            onValueChange={setView}
            className="flex-1 w-full border rounded-lg"
        >
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="table"
                        >
                            Table
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="kanban"
                        >
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="calendar"
                        >
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        onClick={open}
                        size={'sm'}
                        className="w-full lg:w-auto"
                    >
                        <PlusIcon className="size-4" /> New
                    </Button>
                </div>
                <DashedSeparator className="my-4" />
                <DataFilters hideProjectFilter={hideProjectFilter} />
                <DashedSeparator className="my-4" />
                {isLoadingTasks ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="animate-spin size-5 text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <TabsContent value="table" className="mt-0">
                            <DataTable
                                columns={columns}
                                data={tasks?.documents ?? []}
                            />
                        </TabsContent>
                        <TabsContent value="kanban" className="mt-0">
                            <DataKanban
                                onChange={onKanbanChange}
                                data={tasks?.documents ?? []}
                            />
                        </TabsContent>
                        <TabsContent
                            value="calendar"
                            className="mt-0 h-full pb-4"
                        >
                            <DataCanlendar data={tasks?.documents ?? []} />
                        </TabsContent>
                    </>
                )}
            </div>
        </Tabs>
    );
};

export default TaskViewSwitcher;

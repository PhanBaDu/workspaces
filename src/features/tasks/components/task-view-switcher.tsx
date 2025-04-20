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
const TaskViewSwitcher = () => {
    const [{ status, assigneeId, dueDate, projectId, search }] =
        useTaskFilters();

    const [view, setView] = useQueryState('task-view', {
        defaultValue: 'table',
    });

    const workspaceId = useWorkspaceId();
    const { open } = useCreateTaskModal();
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
        workspaceId,
        status,
        assigneeId,
        dueDate,
        projectId,
        search,
    });

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
                        <PlusIcon className="size-4 mr-2" /> New
                    </Button>
                </div>
                <DashedSeparator className="my-4" />
                <DataFilters />
                <DashedSeparator className="my-4" />
                {isLoadingTasks ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="animate-spin size-5 text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <TabsContent value="table" className="mt-0">
                            {JSON.stringify(tasks)}
                        </TabsContent>
                        <TabsContent value="kanban" className="mt-0">
                            {JSON.stringify(tasks)}
                        </TabsContent>
                        <TabsContent value="calendar" className="mt-0">
                            {JSON.stringify(tasks)}
                        </TabsContent>
                    </>
                )}
            </div>
        </Tabs>
    );
};

export default TaskViewSwitcher;

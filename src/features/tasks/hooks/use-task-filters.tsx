import { TaskStatus } from '@/features/tasks/types';
import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';

export const useTaskFilters = () => {
    return useQueryStates({
        projectId: parseAsString,
        status: parseAsStringEnum(Object.values(TaskStatus)),
        assigneeId: parseAsString,
        search: parseAsString,
        dueDate: parseAsString,
    });
};

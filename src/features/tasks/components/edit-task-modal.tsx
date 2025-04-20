'use client';
import { ResponsiveModal } from '@/components/reponsive-modal';
import { EditTaskFormWrapper } from '@/features/tasks/components/edit-task-form-wrapper';
import { useEditTaskModal } from '@/features/tasks/hooks/use-update-task-modal';

const EditTaskModal = () => {
    const { taskId, close } = useEditTaskModal();

    return (
        <ResponsiveModal open={!!taskId} onOpenChange={close}>
            {taskId && <EditTaskFormWrapper onCancel={close} id={taskId} />}
        </ResponsiveModal>
    );
};

export default EditTaskModal;

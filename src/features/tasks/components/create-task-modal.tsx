'use client';
import { ResponsiveModal } from '@/components/reponsive-modal';
import { CreateTaskFormWrapper } from '@/features/tasks/components/create-task-form-wrapper';
import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal';

const CreateTaskModal = () => {
    const { isOpen, setIsOpen, close } = useCreateTaskModal();
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateTaskFormWrapper onCancel={close} />
        </ResponsiveModal>
    );
};

export default CreateTaskModal;

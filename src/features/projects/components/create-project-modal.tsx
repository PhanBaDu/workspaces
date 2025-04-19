'use client';
import { ResponsiveModal } from '@/components/reponsive-modal';
import { CreateProjectForm } from '@/features/projects/components/create-project-form';
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';

export const CreateProjectModal = () => {
    const { isOpen, close, setIsOpen } = useCreateProjectModal();
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateProjectForm onCancel={close} />
        </ResponsiveModal>
    );
};

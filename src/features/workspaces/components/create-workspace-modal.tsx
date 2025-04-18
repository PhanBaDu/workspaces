'use client';
import { ResponsiveModal } from '@/components/reponsive-modal';
import CreateWorkspaceForm from './create-workspace-form';
import { useCreateWorkspaceModal } from '@/features/workspaces/hooks/use-create-workspace-modal';

export const CreateWorkspaceModal = () => {
    const { isOpen, close, setIsOpen } = useCreateWorkspaceModal();
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceForm onCancel={close} />
        </ResponsiveModal>
    );
};

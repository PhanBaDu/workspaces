import { DashedSeparator } from '@/components/dashed-separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateTask } from '@/features/tasks/api/use-update-task';
import { Task } from '@/features/tasks/types';
import { PencilIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

interface TaskDescriptionProps {
    task: Task;
}

export default function TaskDescription({ task }: TaskDescriptionProps) {
    const [isEditing, setIsEditting] = useState(false);
    const [value, setValue] = useState(task.description);
    const { mutate, isPending } = useUpdateTask();

    const handleSave = () => {
        mutate(
            {
                json: { description: value },
                param: { taskId: task.$id },
            },
            {
                onSuccess() {
                    setIsEditting(false);
                },
            },
        );
    };

    return (
        <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Overview</p>
                <Button
                    onClick={() => setIsEditting((prev) => !prev)}
                    size="sm"
                    variant={'secondary'}
                >
                    {isEditing ? (
                        <XIcon className="size-4 mr-2" />
                    ) : (
                        <PencilIcon className="size-4 mr-2" />
                    )}
                    {isEditing ? 'Cancel' : 'Edit'}
                </Button>
            </div>
            <DashedSeparator className="my-4" />

            {isEditing ? (
                <div className="flex flex-col gap-y-4">
                    <Textarea
                        placeholder="Add a description..."
                        value={value}
                        rows={4}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={isPending}
                    />
                    <Button
                        size={'sm'}
                        className="w-fit ml-auto"
                        onClick={handleSave}
                        disabled={isPending}
                    >
                        {isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            ) : (
                <div>
                    {task.description || (
                        <span className="text-muted-foreground">
                            No description set
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

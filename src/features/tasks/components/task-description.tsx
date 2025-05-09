import { DashedSeparator } from '@/components/dashed-separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateTask } from '@/features/tasks/api/use-update-task';
import { Task } from '@/features/tasks/types';
import { PencilRuler, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface TaskDescriptionProps {
    task: Task;
}

export default function TaskDescription({ task }: TaskDescriptionProps) {
    const [isEditing, setIsEditting] = useState(false);
    const t = useTranslations('Task.Client');
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
        <div className="p-4 rounded-lg bg-background">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                    {t('overview_title_desc')}
                </p>
                <Button
                    onClick={() => setIsEditting((prev) => !prev)}
                    size="sm"
                    variant={'secondary'}
                >
                    {isEditing ? (
                        <XIcon className="size-4" />
                    ) : (
                        <PencilRuler className="size-4" />
                    )}
                    {isEditing ? `${t('cancel')}` : `${t('edit')}`}
                </Button>
            </div>
            <DashedSeparator className="my-4" />

            {isEditing ? (
                <div className="flex flex-col gap-y-4">
                    <Textarea
                        placeholder={t('overview_title_pla')}
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
                        {isPending ? `${t('loading')}` : `${t('submit')}`}
                    </Button>
                </div>
            ) : (
                <div>
                    {task.description || (
                        <span className="text-muted-foreground">
                            {t('overview_title_pla')}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

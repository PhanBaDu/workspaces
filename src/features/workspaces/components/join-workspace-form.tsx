'use client';
import { DashedSeparator } from '@/components/dashed-separator';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useJoinWorkspace } from '@/features/workspaces/api/use-join-workspace';
import { useInviteCode } from '@/features/workspaces/hooks/use-invite-code';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
    };
}

export default function JoinWorkspaceForm({
    initialValues,
}: JoinWorkspaceFormProps) {
    const router = useRouter();
    const t = useTranslations('Join.Client');
    const { mutate, isPending } = useJoinWorkspace();
    const inviteCode = useInviteCode();
    const workspaceId = useWorkspaceId();

    const onSubmit = () => {
        mutate(
            {
                param: { workspaceId },
                json: { code: inviteCode },
            },
            {
                onSuccess: ({ data }) => {
                    router.push(`/workspaces/${data.$id}`);
                },
            },
        );
    };

    return (
        <div className="w-full h-full border-none shadow-none">
            <Card className="p-7">
                <CardHeader>
                    <CardTitle>{t('title')}</CardTitle>
                    <CardDescription>
                        {t('desc_1')} <strong>{initialValues.name}</strong>{' '}
                        {t('desc_2')}
                    </CardDescription>
                </CardHeader>
                <div className="px-7">
                    <DashedSeparator />
                </div>
                <CardContent className="p-7">
                    <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
                        <Button
                            size={'lg'}
                            variant={'secondary'}
                            type="button"
                            asChild
                            className="w-full lg:w-fit"
                        >
                            <Link href={'/'}>{t('cancel')}</Link>
                        </Button>

                        <Button
                            type="button"
                            size={'lg'}
                            className="w-full lg:w-fit"
                            onClick={onSubmit}
                            disabled={isPending}
                        >
                            {t('button')}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

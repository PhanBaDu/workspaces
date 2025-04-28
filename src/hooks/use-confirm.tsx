import { useState } from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ResponsiveModal } from '@/components/reponsive-modal';
import { useTranslations } from 'next-intl';

export const useConfirm = (
    title: string,
    message: string,
    variant: ButtonProps['variant'] = 'primary',
): [() => JSX.Element, () => Promise<unknown>] => {
    const t = useTranslations('SettingsPage');
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);

    const confirm = () => {
        return new Promise((resolve) => {
            setPromise({ resolve });
        });
    };

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    const ConfirmationDialog = () => (
        <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
            <Card className="border-none">
                <CardContent className="pt-8">
                    <CardHeader className="p-0">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{message}</CardDescription>
                    </CardHeader>
                    <div className="pt-4 w-full flex flex-col gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
                        <Button
                            onClick={handleCancel}
                            variant={'outline'}
                            className="w-full lg:w-auto"
                        >
                            {t('Client.invite_modal_cancel')}
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            variant={variant}
                            className="w-full lg:w-auto"
                        >
                            {t('Client.invite_modal_confirm')}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </ResponsiveModal>
    );

    return [ConfirmationDialog, confirm];
};

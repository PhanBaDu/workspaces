'use client';

import { DashedSeparator } from '@/components/dashed-separator';
import { Button } from '@/components/ui/button';
import { useGetAdmin } from '@/features/admin/api/use-get-admin';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Admin() {
    const { data, isLoading } = useGetAdmin();

    if (isLoading)
        return (
            <>
                <DashedSeparator />
                <div className="my-1 animate-pulse">
                    <Link href={'/system/analytics'}>
                        <Button
                            className="w-full text-sm text-transparent animate-pulse"
                            variant={'secondary'}
                        >
                            Đi đến trang quản lý hệ thống
                            <ShieldCheck />
                        </Button>
                    </Link>
                </div>
            </>
        );

    if (data && data.total <= 0) return null;

    return (
        <>
            <DashedSeparator />
            <div className="my-1">
                <Link href={'/system/analytics'}>
                    <Button className="w-full text-sm" variant={'secondary'}>
                        Đi đến trang quản lý hệ thống
                        <ShieldCheck />
                    </Button>
                </Link>
            </div>
        </>
    );
}

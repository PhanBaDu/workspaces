'use client';

import PageLoader from '@/components/page-loader';
import { Button } from '@/components/ui/button';
import { useGetAdmin } from '@/features/admin/api/use-get-admin';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Admin() {
    const { data, isLoading } = useGetAdmin();

    if (isLoading) return <PageLoader />;

    if (data && data.total <= 0) return null;

    return (
        <div className="flex-1 flex items-end">
            <Link href={'/system/analytics'}>
                <Button className="w-full text-sm" variant={'outline'}>
                    Đi đến trang quản lý hệ thống
                    <ShieldCheck />
                </Button>
            </Link>
        </div>
    );
}

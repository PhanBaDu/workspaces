'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SidebarLogo() {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Chỉ render logo sau khi mount trên client
    useEffect(() => {
        setMounted(true);
    }, []);

    // Nếu chưa mount, trả về placeholder hoặc null để SSR/CSR khớp nhau
    if (!mounted) {
        return (
            <div className="flex items-center">
                {/* placeholder giữ chỗ đúng kích thước */}
                <div style={{ width: 57, height: 47 }} />
                <h1 className="text-primary font-extrabold text-2xl mt-2 uppercase">
                    orkspaces
                </h1>
            </div>
        );
    }

    // Nếu user chọn 'system', sử dụng systemTheme, còn lại lấy theme
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <div className="flex items-center">
            <Image
                src={
                    currentTheme === 'dark'
                        ? '/dark-logo.svg'
                        : '/light-logo.svg'
                }
                width={57}
                height={47}
                alt="Logo Workspaces"
                priority
            />
            <h1 className="text-primary font-extrabold text-2xl mt-2 uppercase truncate">
                orkspaces
            </h1>
        </div>
    );
}

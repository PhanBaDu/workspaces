'use client';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import setLanguageValue from '@/i18n/action';
import { CheckCheck, X } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export default function SetLocale() {
    const locale = useLocale();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className="focus:outline-none">
                <Button
                    variant={'outline'}
                    className="text-sm font-medium flex items-center"
                >
                    {locale === 'vi' ? 'VN' : 'EN'}{' '}
                    {locale === 'vi' ? (
                        <Image
                            src={'/vi.png'}
                            alt="vi"
                            width={14}
                            height={14}
                        />
                    ) : (
                        <Image
                            src={'/en.png'}
                            alt="vi"
                            width={14}
                            height={14}
                        />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setLanguageValue('vi')}
                >
                    {locale === 'vi' ? (
                        <CheckCheck />
                    ) : (
                        <X className="text-destructive" />
                    )}
                    <div className="flex justify-between items-center w-full">
                        <span>Vietnamese</span>
                        <Image
                            src={'/vi.png'}
                            alt="vi"
                            width={14}
                            height={14}
                        />
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setLanguageValue('en')}
                >
                    {locale === 'en' ? (
                        <CheckCheck />
                    ) : (
                        <X className="text-destructive" />
                    )}
                    <div className="flex justify-between items-center w-full">
                        <span>English</span>
                        <Image
                            src={'/en.png'}
                            alt="vi"
                            width={14}
                            height={14}
                        />
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

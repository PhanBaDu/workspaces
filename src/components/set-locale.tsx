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
import { CheckCheck, ChevronDown, X } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export default function SetLocale() {
    const locale = useLocale();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className="focus:outline-none">
                <Button
                    variant={'outline'}
                    className="text-sm font-medium flex items-center border-input"
                >
                    <div className="flex items-center gap-1">
                        {locale === 'vi' ? 'VN' : 'EN'}
                        {locale === 'vi' ? (
                            <Image
                                src={'/vi.png'}
                                alt="vi"
                                width={100}
                                height={100}
                                quality={100}
                                className="w-4 h-3 mb-[0.5px]"
                            />
                        ) : (
                            <Image
                                src={'/en.png'}
                                alt="vi"
                                width={100}
                                height={100}
                                quality={100}
                                className="w-4 h-3 mb-[1px]"
                            />
                        )}
                    </div>{' '}
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 !bg-card">
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setLanguageValue('vi')}
                >
                    {locale === 'vi' ? (
                        <CheckCheck className="text-primary" />
                    ) : (
                        <X className="text-transparent" />
                    )}
                    <div className="flex justify-between items-center w-full">
                        <span>Vietnamese</span>
                        <Image
                            src={'/vi.png'}
                            alt="vi"
                            width={100}
                            height={100}
                            quality={100}
                            className="w-4 h-3 mb-[0.5px]"
                        />
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setLanguageValue('en')}
                >
                    {locale === 'en' ? (
                        <CheckCheck className="text-primary" />
                    ) : (
                        <X className="text-transparent" />
                    )}
                    <div className="flex justify-between items-center w-full">
                        <span>English</span>
                        <Image
                            src={'/en.png'}
                            alt="vi"
                            width={100}
                            height={100}
                            quality={100}
                            className="w-4 h-3 mb-[1px]"
                        />
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

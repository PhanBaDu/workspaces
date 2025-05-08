import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/query-provider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { getLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Workspaces',
    description: 'Workspaces',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();

    return (
        <html lang={locale}>
            <body
                className={`${inter.className} 'antialiased min-h-screen' bg-muted`}
            >
                <QueryProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <NextIntlClientProvider>
                            <Toaster />
                            {children}
                        </NextIntlClientProvider>
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    );
}

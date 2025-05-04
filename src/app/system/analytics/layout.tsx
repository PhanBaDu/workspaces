import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full relative">
                <SidebarTrigger className="z-10 fixed ml-1 mt-1 w-10 h-10 bg-primary text-background dark:text-white hover:bg-primary/80 hover:text-background" />
                {children}
            </main>
        </SidebarProvider>
    );
}

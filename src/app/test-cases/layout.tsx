import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function TestCasesLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full px-4 py-4 sm:px-8 lg:px-16 space-y-4">
                {children}
            </main>
        </SidebarProvider>
    );
}
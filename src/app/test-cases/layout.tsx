import { AddTestCaseDialog } from "@/components/features/test-cases/create-form/AddTestCaseDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TestCasesLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="px-4 py-4 sm:px-8 lg:px-16 space-y-4">
            {children}
        </main>
    );
}
"use client"

import { useState } from "react"
import { AddTestCaseForm, testCaseFormSchema } from "./AddTestCaseForm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import z from "zod"
import { useTestCases } from "@/hooks/useTestCases"
import { TestCase } from "@/types/test-case"

interface TestCaseDialogProps {
    mode: "create" | "edit";
    testCase?: TestCase;
    children?: React.ReactNode;
    onSuccess?: () => void;
    open: boolean;
    onOpenChange: (open: boolean) => void
}

export const TestCaseDialog = ({
    mode,
    testCase,
    children,
    onSuccess,
    open,
    onOpenChange,
}: TestCaseDialogProps) => {
    const { createTestCase, updateTestCase } = useTestCases()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (data: z.infer<typeof testCaseFormSchema>) => {
        setIsLoading(true);

        try {
            if (mode === "create") {
                await createTestCase({
                    title: data.title,
                    feature: data.feature,
                    status: data.status,
                    automation_status: data.automation_status,
                    description: data.description,
                    test_steps: data.steps?.map((step, index) => ({
                        ...step,
                        step_order: index + 1
                    }))
                });
            } else if (mode === "edit" && testCase) {
                await updateTestCase({
                    id: testCase.id,
                    title: data.title,
                    feature: data.feature,
                    status: data.status,
                    automation_status: data.automation_status,
                    description: data.description,
                    test_steps: data.steps?.map((step, index) => ({
                        ...step,
                        id: testCase.test_steps?.[index]?.id,
                        step_order: index + 1,
                        test_case_id: testCase.id
                    }))
                });
            }

            onOpenChange(false);
            onSuccess?.();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-h-[80vh] overflow-y-auto"
                aria-describedby=""
            >
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create" ? "Add a new Test Case" : "Edit Test Case"}
                    </DialogTitle>
                </DialogHeader>
                <AddTestCaseForm
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    defaultValues={mode === "edit" && testCase ? {
                        title: testCase.title,
                        feature: testCase.feature || '',
                        status: testCase.status,
                        automation_status: testCase.automation_status,
                        description: testCase.description || '',
                        steps: testCase.test_steps
                            ?.sort((a, b) => (a.step_order || 0) - (b.step_order || 0))
                            .map(step => ({
                                id: step.id,
                                action: step.action || '',
                                expected: step.expected || '',
                                status: step.status || 'pending',
                                step_order: step.step_order
                            })) || []
                    } : undefined}
                />
            </DialogContent>
        </Dialog >
    )
}

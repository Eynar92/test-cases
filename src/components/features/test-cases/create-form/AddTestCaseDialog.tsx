"use client"

import { useState } from "react"
import { AddTestCaseForm, testCaseFormSchema } from "./AddTestCaseForm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import z from "zod"
import { useTestCases } from "@/hooks/useTestCases"

export const AddTestCaseDialog = () => {
    const { createTestCase } = useTestCases()
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (data: z.infer<typeof testCaseFormSchema>) => {
        setIsLoading(true)
        await createTestCase(data)
        setIsLoading(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>New Test Case</Button>
            </DialogTrigger>
            <DialogContent
                className="max-h-[80vh] overflow-y-auto"
                aria-describedby=""
            >
                <DialogHeader>
                    <DialogTitle>Add a new Test Case</DialogTitle>
                </DialogHeader>
                <AddTestCaseForm onSubmit={handleSubmit} isLoading={isLoading} />
            </DialogContent>
        </Dialog>
    )
}

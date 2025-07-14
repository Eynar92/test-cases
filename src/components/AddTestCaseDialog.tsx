"use client"

import { useState } from "react"
import { AddTestCaseForm, testCaseFormSchema } from "./AddTestCaseForm"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import z from "zod"
import { useTestCases } from "@/context/TestCasesContext"

export const AddTestCaseDialog = () => {
    const {testCases, setTestCases} = useTestCases();
    const [open, setOpen] = useState(false);

    const handleSubmit = (data: z.infer<typeof testCaseFormSchema>) => {
        console.log("Form data:", data)
        const newTestCase = {
            ...data,
            id: Date.now(),
            tags: []
        }
        setTestCases([...testCases, newTestCase])
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
                <AddTestCaseForm onSubmit={handleSubmit} />
            </DialogContent>
        </Dialog>
    )
}

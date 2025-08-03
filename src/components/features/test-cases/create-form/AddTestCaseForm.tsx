"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2Icon } from "lucide-react"
import { mockFeatures } from "@/data/mock-features"

const stepSchema = z.object({
    id: z.number().optional(),
    action: z.string().min(1, "Action is required"),
    expected: z.string().min(1, "Expected result is required"),
    status: z.enum(["pending", "passed", "failed", "skipped", "not_executed", "blocked"]),
    step_order: z.number().optional()
})

export const testCaseFormSchema = z.object({
    title: z.string().min(3, "Title too short").max(120, "Title too long"),
    feature: z.string().min(3, "Feature too short").optional(),
    status: z.enum(["pending", "passed", "failed", "blocked"]),
    automation_status: z.enum(["automated", "to-automate", "manual", "deprecated"]),
    description: z.string().optional(),
    steps: z.array(stepSchema).optional(),
})

export const AddTestCaseForm = ({
    onSubmit,
    isLoading,
    defaultValues,
}: {
    onSubmit: (data: z.infer<typeof testCaseFormSchema>) => void,
    isLoading: boolean,
    defaultValues?: z.infer<typeof testCaseFormSchema>
}) => {

    type FormValues = z.infer<typeof testCaseFormSchema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(testCaseFormSchema),
        defaultValues: defaultValues || {
            title: "",
            status: "pending",
            automation_status: "manual"
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "steps"
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="required-field">Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a title..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="feature"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Feature</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-full">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a feature" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            mockFeatures.map((feature, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={feature}
                                                    className="capitalize"
                                                >
                                                    {feature}
                                                </SelectItem>
                                            ))
                                        }
                                        <SelectItem value="job">Job</SelectItem>
                                        <SelectItem value="candidate">Candidate</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="required-field">Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-full">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="passed">Passed</SelectItem>
                                        <SelectItem value="failed">Failed</SelectItem>
                                        <SelectItem value="blocked">Blocked</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="automation_status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="required-field">Automation Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-full">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="automated">Automated</SelectItem>
                                        <SelectItem value="to-automate">To Automate</SelectItem>
                                        <SelectItem value="manual">Manual</SelectItem>
                                        <SelectItem value="deprecated">Deprecated</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl className="w-full">
                                <Textarea
                                    placeholder="Describe the test case..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/*TODO Steps Section - I need to resolve in a better way */}
                <div className="space-y-4">
                    <div className="flex gap-4 items-center">
                        <FormLabel>Test Steps</FormLabel>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ action: "", expected: "", status: "pending" })}
                        >
                            Add Step
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-3 p-4 border rounded-lg">
                            <FormField
                                control={form.control}
                                name={`steps.${index}.action`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Action #{index + 1}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Click login button" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`steps.${index}.expected`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expected Result</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Redirect to dashboard" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`steps.${index}.status`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="passed">Passed</SelectItem>
                                                <SelectItem value="failed">Failed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {fields.length > 0 && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => remove(index)}
                                    className="mt-2"
                                >
                                    Remove Step
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full"
                >
                    {isLoading ? <Loader2Icon className="animate-spin" /> : "Save Test Case"}
                </Button>
            </form>
        </Form>
    )
}

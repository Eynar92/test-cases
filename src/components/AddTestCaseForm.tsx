"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"

const stepSchema = z.object({
    action: z.string().min(5, "Action must be at least 5 characters").optional(),
    expected: z.string().min(5, "Expected result must be at least 5 characters").optional(),
    status: z.enum(["pending", "passed", "failed"]).optional(),
})

export const testCaseFormSchema = z.object({
    title: z.string().min(3, "Title too short").max(120, "Title too long"),
    feature: z.string().min(3, "Feature too short").optional(),
    status: z.enum(["pending", "passed", "failed", "blocked"]),
    description: z.string().optional(),
    steps: z.array(stepSchema).optional(),
})

export const AddTestCaseForm = ({ onSubmit }: { onSubmit: (data: z.infer<typeof testCaseFormSchema>) => void }) => {

    type FormValues = z.infer<typeof testCaseFormSchema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(testCaseFormSchema),
        defaultValues: {
            title: "",
            status: "pending",
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
                            <FormLabel className="relative after:content-['*'] after:text-red-600">Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a title..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="feature"
                        render={({ field }) => (
                            <FormItem className="basis-1/2">
                                <FormLabel>Feature</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-full">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a feature" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="requisition">Requisition</SelectItem>
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
                            <FormItem className="basis-1/2">
                                <FormLabel>Status</FormLabel>
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
                </div>
                {/*TODO Steps Section - I need to resolve in a better way */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
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

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
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

                <Button type="submit" className="w-full">Save Test Case</Button>
            </form>
        </Form>
    )
}

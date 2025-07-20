"use client"
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useTestCases } from "@/hooks/useTestCases";
import { use, useEffect } from "react";

export default function TestCaseDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params)
    const { testCase, fetchTestCase, loading, error } = useTestCases()

    useEffect(() => {
        fetchTestCase(id)
        console.log({ testCase })
    }, []);

    if (error) notFound()

    return (
        <>
            {
                !testCase || loading ? (
                    <div>Loading...</div>
                ) : (
                    <section className="max-w-4xl mx-auto p-6">
                        <h1 className="text-3xl font-bold mb-4">{testCase.title}</h1>
                        <div className="flex gap-2 mb-6">
                            {testCase.feature &&
                                <Badge>{testCase.feature}</Badge>
                            }
                            <Badge
                                className={
                                    testCase.status === "passed"
                                        ? "bg-green-600"
                                        : testCase.status === "failed"
                                            ? "bg-red-600"
                                            : "bg-yellow-600"
                                }
                            >
                                {testCase.status.toUpperCase()}
                            </Badge>
                        </div>
                        {testCase.description ? (
                            <p className="text-lg mb-8">{testCase.description}</p>
                        ) : (
                            <span className="text-lg text-muted-foreground font-semibold">No description</span>
                        )}

                        <h2 className="text-xl font-semibold mb-4">Steps</h2>
                        <div className="space-y-4">
                            {
                                testCase.test_steps && testCase.test_steps.length > 0 ? (
                                    testCase.test_steps.map((step) => (
                                        <div key={step.id} className="border p-4 rounded-lg">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium">Step {step.id}</h3>
                                                {step.status &&
                                                    <Badge
                                                        className={
                                                            step.status === "passed"
                                                                ? "bg-green-600"
                                                                : step.status === "failed"
                                                                    ? "bg-red-600"
                                                                    : "bg-yellow-600"
                                                        }
                                                    >
                                                        {step.status.toUpperCase()}
                                                    </Badge>
                                                }
                                            </div>
                                            <p><span className="font-semibold">Action:</span> {step.action}</p>
                                            <p><span className="font-semibold">Expected:</span> {step.expected}</p>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-lg text-muted-foreground font-semibold">No defined steps</span>
                                )
                            }
                        </div>
                    </section>
                )
            }
        </>

    );
}
"use client"
import { use, useEffect } from "react"
import { useTestCases } from "@/hooks/useTestCases"
import { DataTable } from "@/components/features/test-cases/main-data-table/DataTable"
import { columns } from "@/components/features/test-cases/main-data-table/columns"

export default function TestCasesByFeature({
    params,
}: {
    params: Promise<{ feature: string }>
}) {
    const { feature } = use(params)
    const { testCases, loading, fetchTestCasesByFeature } = useTestCases()

    useEffect(() => {
        fetchTestCasesByFeature(feature)
    }, []);

    return (
        <DataTable columns={columns} data={testCases} isLoading={loading} />
    )
}

"use client"
import { useEffect } from "react"
import { useTestCases } from "@/hooks/useTestCases"
import { DataTable } from "@/components/features/test-cases/main-data-table/DataTable"
import { columns } from "@/components/features/test-cases/main-data-table/columns"

export default function TestCases() {

    const { testCases, loading, fetchTestCases } = useTestCases()
    useEffect(() => {
        fetchTestCases()
    }, []);

    return (
        <DataTable columns={columns} data={testCases} isLoading={loading} />
    )
}

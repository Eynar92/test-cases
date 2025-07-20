"use client"
import { useTestCases } from "@/hooks/useTestCases"
import { DataTable } from "@/components/features/test-cases/main-data-table/DataTable"
import { columns } from "@/components/features/test-cases/main-data-table/columns"
import { Button } from "@/components/ui/button"

export default function TestCases() {

    const { testCases, loading, fetchTestCases } = useTestCases()

    return (
        <div className="space-x-4">
            <div className="flex justify-between">
                <Button onClick={fetchTestCases} disabled={loading}>
                    {loading ? "Loading..." : "Refresh"}
                </Button>
            </div>
            <DataTable columns={columns} data={testCases} />
        </div>
    )
}

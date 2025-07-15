"use client"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useTestCases } from "@/context/TestCasesContext"
import { DataTable } from "@/components/test-cases-table/data-table"
import { columns } from "@/components/test-cases-table/columns"

export default function TestCases() {

    const { testCases } = useTestCases()

    return (
        <section>
            <DataTable columns={columns} data={testCases} />
        </section>
    )
}

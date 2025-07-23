"use client";

import { TestCase } from "@/types/test-case";
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../../../ui/badge";
import Link from "next/link";

export const columns: ColumnDef<TestCase>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <Link
                href={`/test-cases/${row.getValue('id')}`}
            >
                {row.getValue("title")}
            </Link>
        )
    },
    {
        accessorKey: "feature",
        header: "Feature",
        cell: ({ row }) => {
            const parseFeature: string = row.getValue("feature")
            return <Badge variant="secondary">{parseFeature ? parseFeature : "Not Assigned"}</Badge>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const parseStatus: string = row.getValue("status")
            return <Badge
                className={
                    parseStatus === "passed"
                        ? 'bg-green-100 text-green-600'
                        : parseStatus === 'failed'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-yellow-100 text-yellow-600'
                }
            >{parseStatus.toUpperCase()}</Badge>
        }
    },
    {
        accessorKey: "automation_status",
        header: "Automation",
        cell: ({ row }) => {
            const automation_status: string = row.getValue("automation_status");
            return <Badge
                variant="outline"
                className={
                    automation_status === "automated"
                        ? "bg-blue-100 text-blue-800"
                        : automation_status === "to-automate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                }
            >
                {automation_status.toUpperCase()}
            </Badge>
        },
    },
]
"use client";

import { TestCase } from "@/types/test-case";
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge";
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
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <p
                className="truncate"
                title={row.getValue("description")}
            >
                {row.getValue("description")}
            </p>
        )
    },
    {
        accessorKey: "feature",
        header: "Feature",
        cell: ({ row }) => {
            const parseFeature: string = row.getValue("feature")
            return <Badge variant="secondary">{parseFeature}</Badge>
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
                        ? 'bg-green-600'
                        : parseStatus === 'failed'
                            ? 'bg-red-600'
                            : 'bg-yellow-600'
                }
            >{parseStatus.toUpperCase()}</Badge>
        }
    },
]
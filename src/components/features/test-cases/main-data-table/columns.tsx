"use client";

import { TestCase } from "@/types/test-case";
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../../../ui/badge";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { DeleteModal } from "../DeleteModal";
import { useTestCases } from "@/hooks/useTestCases";
import { TestCaseDialog } from "../create-form/AddTestCaseDialog";

export const columns: ColumnDef<TestCase>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            const testCase = row.original;
            return <Link
                href={`/test-cases/${testCase.id}`}
            >
                {row.getValue("title")}
            </Link>
        }
    },
    {
        accessorKey: "feature",
        header: "Feature",
        cell: ({ row }) => {
            const parseFeature: string = row.getValue("feature")
            return <Badge
                className="capitalize"
                variant="secondary"
            >
                {parseFeature ? parseFeature : "Not Assigned"}
            </Badge>
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
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const { deleteTestCase, loading } = useTestCases()
            const testCase = row.original
            const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
            const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

            const handleDelete = async () => {
                await deleteTestCase(testCase.id)
                setIsDeleteModalOpen(false)
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => setIsEditModalOpen(true)}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setIsDeleteModalOpen(true)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <TestCaseDialog
                        mode="edit"
                        testCase={testCase}
                        open={isEditModalOpen}
                        onOpenChange={setIsEditModalOpen}
                    />
                    <DeleteModal
                        isOpen={isDeleteModalOpen}
                        isLoading={loading}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onConfirm={handleDelete}
                        testCaseId={testCase.id}
                    />
                </>
            )
        }
    }
]
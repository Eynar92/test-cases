import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2Icon } from "lucide-react"

interface DeleteConfirmModalProps {
    isOpen: boolean
    isLoading: boolean
    onClose: () => void
    onConfirm: () => void
    testCaseId: number
}

export const DeleteModal = ({
    isOpen,
    isLoading,
    onClose,
    onConfirm,
    testCaseId
}: DeleteConfirmModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete test case {testCaseId}.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        disabled={isLoading}
                        onClick={onConfirm}
                    >
                        {isLoading ? <Loader2Icon className="animate-spin" /> : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

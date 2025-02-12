'use client'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

type ConfirmationDialogProps = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    description: string
}

const ConfirmationDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
}: ConfirmationDialogProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="rounded-sm shadow-xs">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-medium">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={onClose}
                        className="cursor-pointer rounded-sm shadow-xs"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        className="cursor-pointer rounded-sm shadow-xs"
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmationDialog

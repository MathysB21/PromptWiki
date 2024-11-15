"use client"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function DeleteDialog ({isAlertOpen, setIsAlertOpen, handleDelete}) {
    return (
        <>
            {/* AlertDialog when no session is present */}
            <AlertDialog open={isAlertOpen} onOpenChange={(open) => setIsAlertOpen(open)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you certain that you want to delete this prompt? This action is irreversible.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <button type="button" onClick={() => setIsAlertOpen(false)} className="outline_btn">
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="red_btn"
                >
                    Delete
                </button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
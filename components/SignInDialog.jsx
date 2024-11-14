"use client"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function SignInDialog ({isAlertOpen, setIsAlertOpen}) {
    const [providers, setProviders] = useState(null)

    useEffect(() => {
    (async () => {
        const res = await getProviders();
        setProviders(res);
    })();
    }, []);

    return (
        <>
            {/* AlertDialog when no session is present */}
            <AlertDialog open={isAlertOpen} onOpenChange={(open) => setIsAlertOpen(open)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Sign In to Continue</AlertDialogTitle>
                <AlertDialogDescription>
                    You need to be signed in to favourite prompts!
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <button type="button" onClick={() => setIsAlertOpen(false)} className="outline_btn">
                    Close
                </button>
                    {providers && Object.values(providers).map((provider) => (
                <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                    signIn(provider.id)
                    }}
                    className="black_btn"
                >
                    Sign In
                </button>
                ))}
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
"use client";

import { useState } from "react";
import RequestToRentForm from "./RequestToRentForm";

interface Props {
    propertyId: string;
    disabled?: boolean;
}

export default function RequestToRentButton({
    propertyId,
    disabled = false,
}: Props) {
    const [open, setOpen] = useState(false);

    if (disabled) {
        return (
            <button
                type="button"
                disabled
                className="mt-6 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground opacity-50"
            >
                Currently Unavailable
            </button>
        );
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="mt-6 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            >
                Request to Rent
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Request to Rent
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Submit your rental request to the landlord.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="text-2xl text-muted-foreground hover:text-foreground"
                            >
                                ×
                            </button>
                        </div>

                        <RequestToRentForm
                            propertyId={propertyId}
                            onSuccess={() => setOpen(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
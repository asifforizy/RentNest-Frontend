"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createCheckoutSessionAction } from "../_actions/payment";

interface Props {
    rentalRequestId: string;
}

export default function PayNowButton({
    rentalRequestId,
}: Props) {
    const [loading, setLoading] = useState(false);

    async function handlePayment() {
        if (loading) return;

        setLoading(true);

        try {
            const result =
                await createCheckoutSessionAction(
                    rentalRequestId
                );

            if (!result?.paymentUrl) {
                throw new Error(
                    "Payment URL was not returned."
                );
            }

            window.location.href = result.paymentUrl;
        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to start payment."
            );

            setLoading(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className="w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {loading ? "Redirecting to payment..." : "Pay Now"}
        </button>
    );
}
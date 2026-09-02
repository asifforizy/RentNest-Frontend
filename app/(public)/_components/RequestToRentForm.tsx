"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createRentalAction } from "../_actions/rental";

interface Props {
    propertyId: string;
    onSuccess?: () => void;
}

export default function RequestToRentForm({
    propertyId,
    onSuccess,
}: Props) {
    const [moveInDate, setMoveInDate] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!moveInDate) {
            toast.error("Please select a move-in date.");
            return;
        }

        setLoading(true);

        try {
            await createRentalAction({
                propertyId,
                moveInDate,
                message,
            });

            toast.success(
                "Rental request submitted successfully."
            );

            setMoveInDate("");
            setMessage("");

            onSuccess?.();
        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to submit rental request."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label
                    htmlFor="moveInDate"
                    className="mb-2 block text-sm font-medium"
                >
                    Move-in Date
                </label>

                <input
                    id="moveInDate"
                    type="date"
                    value={moveInDate}
                    onChange={(e) =>
                        setMoveInDate(e.target.value)
                    }
                    min={new Date()
                        .toISOString()
                        .split("T")[0]}
                    required
                    className="w-full rounded-lg border bg-background px-3 py-2.5"
                />
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium"
                >
                    Message
                </label>

                <textarea
                    id="message"
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    placeholder="Tell the landlord about yourself or your rental needs..."
                    rows={5}
                    className="w-full resize-none rounded-lg border bg-background px-3 py-2.5"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading
                    ? "Submitting..."
                    : "Submit Rental Request"}
            </button>
        </form>
    );
}
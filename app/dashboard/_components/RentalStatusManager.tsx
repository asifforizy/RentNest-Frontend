
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    RequestStatus,
} from "@/types/landlord";

import {
    updateRentalRequestAction,
} from "../_actions/landlord";

interface Props {
    requestId: string;
    currentStatus: RequestStatus;
}

export default function RequestStatusManager({
    requestId,
    currentStatus,
}: Props) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const availableStatuses =
        getAvailableStatuses(currentStatus);

    async function updateStatus(
        status: RequestStatus
    ) {
        if (status === currentStatus || loading) {
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to ${getActionLabel(
                status
            ).toLowerCase()}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setLoading(true);

            await updateRentalRequestAction(
                requestId,
                status
            );

            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to update rental request.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-fit rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">
                Manage Request
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
                Choose an action based on the current request status.
            </p>

            {availableStatuses.length > 0 ? (
                <div className="mt-6 space-y-3">
                    {availableStatuses.map((status) => (
                        <button
                            key={status}
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                updateStatus(status)
                            }
                            className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                status === "REJECTED" ||
                                status === "CANCELLED"
                                    ? "border border-red-200 text-red-600 hover:bg-red-50"
                                    : "bg-gray-900 text-white hover:bg-gray-800"
                            }`}
                        >
                            {loading
                                ? "Updating..."
                                : getActionLabel(status)}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="mt-6 rounded-lg border bg-muted/30 p-4">
                    <p className="text-sm font-medium">
                        No actions available
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        This request has reached a final status.
                    </p>
                </div>
            )}
        </div>
    );
}

function getAvailableStatuses(
    status: RequestStatus
): RequestStatus[] {
    switch (status) {
        case "PENDING":
            return ["APPROVED", "REJECTED"];

        case "APPROVED":
            return ["ACTIVE", "CANCELLED"];

        case "ACTIVE":
            return ["COMPLETED", "CANCELLED"];

        case "REJECTED":
            return [];

        case "CANCELLED":
            return [];

        case "COMPLETED":
            return [];

        default:
            return [];
    }
}

function getActionLabel(status: RequestStatus) {
    switch (status) {
        case "APPROVED":
            return "Approve Request";

        case "REJECTED":
            return "Reject Request";

        case "ACTIVE":
            return "Mark as Active";

        case "CANCELLED":
            return "Cancel Rental";

        case "COMPLETED":
            return "Mark as Completed";

        default:
            return status;
    }
}
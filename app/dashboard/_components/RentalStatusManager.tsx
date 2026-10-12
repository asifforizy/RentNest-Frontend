
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { RequestStatus } from "@/types/landlord";
import { updateRentalRequestAction } from "../_actions/landlord";

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

    const availableStatuses = getAvailableStatuses(currentStatus);

    async function updateStatus(status: RequestStatus) {
        if (status === currentStatus || loading) {
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to ${getActionLabel(status).toLowerCase()}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setLoading(true);

            await updateRentalRequestAction(requestId, status);

            router.refresh();
        } catch (error) {
            console.error(error);
            window.alert("Failed to update rental request.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-fit rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">
                Manage Request
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
                Choose an action based on the current request status.
            </p>

            {availableStatuses.length > 0 ? (
                <div className="mt-6 space-y-3">
                    {availableStatuses.map((status) => {
                        const isDestructive =
                            status === "REJECTED" || status === "CANCELLED";

                        return (
                            <button
                                key={status}
                                type="button"
                                disabled={loading}
                                onClick={() => updateStatus(status)}
                                className={`w-full rounded-lg border px-4 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${isDestructive
                                        ? "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
                                        : "border-primary bg-primary text-primary-foreground hover:opacity-90"
                                    }`}
                            >
                                {loading ? "Updating..." : getActionLabel(status)}
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
                    <p className="text-sm font-medium text-foreground">
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
        case "CANCELLED":
        case "COMPLETED":
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

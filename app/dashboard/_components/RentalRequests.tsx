"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
    RentalRequest,
    RequestStatus,
} from "@/types/landlord";
import { updateRentalRequestAction } from "../_actions/landlord";

interface Props {
    requests: RentalRequest[];
}


export default function RentalRequestList({
    requests,
}: Props) {
    const router = useRouter();
    const [loadingId, setLoadingId] =
        useState<string | null>(null);


    async function handleStatus(
        id: string,
        status: RequestStatus
    ) {

        try {
            setLoadingId(id);
            await updateRentalRequestAction(
                id,
                status
            );
            router.refresh();
        } catch (error) {
            console.error(error);
            alert(
                "Failed to update request"
            );
        } finally {
            setLoadingId(null);
        }
    }

    if (!requests.length) {
        return (
            <div>
                No rental requests found.
            </div>
        );

    }


    return (
        <div className="space-y-4">
            {requests.map((request) => (
                <div  key={request.id}    className="border rounded-lg p-5">
                    <h2 className="font-bold">
                        {request.property?.title}
                    </h2>
                    <p>
                        Tenant:{" "} {request.tenant?.name}
                    </p>
                    <p>
                        {request.tenant?.email}
                    </p>
                    <p className="mt-2">
                        Status:
                        {" "}
                        <strong>
                            {request.status}
                        </strong>
                    </p>
                    {request.status === "PENDING" && (
                        <div className="flex gap-3 mt-4">
                            <button
                                disabled={
                                    loadingId === request.id
                                }

                                onClick={() =>
                                    handleStatus(
                                        request.id,
                                        "APPROVED"
                                    )
                                }

                                className="bg-gray-900 text-white px-4 py-2 rounded"
                            >
                                Approve

                            </button>


                            <button
                                disabled={
                                    loadingId === request.id
                                }

                                onClick={() =>
                                    handleStatus(
                                        request.id,
                                        "REJECTED"
                                    )
                                }
                                className="border border-red-500 text-red-500 px-4 py-2 rounded"
                            >

                                Reject
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
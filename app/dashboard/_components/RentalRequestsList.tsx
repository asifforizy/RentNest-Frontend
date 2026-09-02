"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    RentalRequest,
    RequestStatus,
} from "@/types/landlord";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


interface Props {
    requests: RentalRequest[];
}

export default function RentalRequestList({
    requests,
}: Props) {
    const router = useRouter();

    const pendingCount = requests.filter(
        (request) => request.status === "PENDING"
    ).length;

    const approvedCount = requests.filter(
        (request) => request.status === "APPROVED"
    ).length;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Rental Requests
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Review and manage rental requests for your properties.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border bg-card p-5 shadow-sm">
                    <p className="text-sm text-muted-foreground">
                        Pending Requests
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {pendingCount}
                    </p>
                </div>

                <div className="rounded-2xl border bg-card p-5 shadow-sm">
                    <p className="text-sm text-muted-foreground">
                        Approved Requests
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {approvedCount}
                    </p>
                </div>
            </div>

            {requests.length === 0 ? (
                <div className="rounded-2xl border bg-card p-12 text-center">
                    <h2 className="text-lg font-semibold">
                        No rental requests
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        You don't have any rental requests yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => (
                        <div
                            key={request.id}
                            className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex flex-col md:flex-row">
                                <div className="relative h-56 w-full md:h-auto md:w-72">
                                    <Image
                                        unoptimized
                                        src={request.property?.propertyPhoto || "/placeholder-property.jpg"}
                                        alt={
                                            request.property?.title ||
                                            "Property"
                                        }
                                        fill
                                        sizes="(max-width: 768px) 100vw, 288px"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col justify-between p-6">
                                    <div>
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                    Property
                                                </p>

                                                <h2 className="mt-1 text-xl font-bold">
                                                    {request.property?.title ||
                                                        "Unknown property"}
                                                </h2>
                                            </div>

                                            <StatusBadge
                                                status={request.status}
                                            />
                                        </div>

                                        <p className="mt-3 text-sm text-muted-foreground">
                                            {request.property?.city ||
                                                "Unknown city"}

                                            {request.property?.country
                                                ? `, ${request.property.country}`
                                                : ""}
                                        </p>

                                        <div className="mt-5">
                                            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                Tenant
                                            </p>

                                            <p className="mt-1 font-medium">
                                                {request.tenant?.name ||
                                                    "Unknown tenant"}
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                {request.tenant?.email ||
                                                    "No email available"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <Link
                                            href={`/dashboard/landlord/requests/${request.id}`}
                                            className="group inline-block "
                                        >
                                            <div className="flex items-center gap-1 text-sm font-medium text-gray-600 transition hover:text-gray-900 hover:translate-x-1 hover:bg-accent hover:rounded-lg px-2 py-1 hover:bg-opacity-10 hover:underline">
                                                View Details
                                                <ArrowRight
                                                    size={16}
                                                    className="transition-transform duration-200 group-hover:translate-x-1"
                                                />
                                            </div>
                                        </Link>


                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function StatusBadge({
    status,
}: {
    status: RequestStatus;
}) {
    const styles: Record<RequestStatus, string> = {
        PENDING:
            "border-yellow-200 bg-yellow-50 text-yellow-700",
        APPROVED:
            "border-green-200 bg-green-50 text-green-700",
        REJECTED:
            "border-red-200 bg-red-50 text-red-700",
        CANCELLED:
            "border-gray-200 bg-gray-50 text-gray-600",
        ACTIVE:
            "border-blue-200 bg-blue-50 text-blue-700",
        COMPLETED:
            "border-purple-200 bg-purple-50 text-purple-700",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
        >
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
            {formatStatus(status)}
        </span>
    );
}

function formatStatus(status: RequestStatus) {
    return (
        status.charAt(0) +
        status.slice(1).toLowerCase()
    );
}
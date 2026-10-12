"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type {
    RentalRequest,
    RequestStatus,
} from "@/types/landlord";

interface Props {
    requests: RentalRequest[];
}

export default function RentalRequestList({ requests }: Props) {
    const pendingCount = requests.filter(
        (request) => request.status === "PENDING"
    ).length;

    const approvedCount = requests.filter(
        (request) => request.status === "APPROVED"
    ).length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Rental Requests
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Review and manage rental requests for your properties.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
                    <p className="text-sm text-muted-foreground">
                        Pending Requests
                    </p>

                    <p className="mt-2 text-3xl font-bold text-foreground">
                        {pendingCount}
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
                    <p className="text-sm text-muted-foreground">
                        Approved Requests
                    </p>

                    <p className="mt-2 text-3xl font-bold text-foreground">
                        {approvedCount}
                    </p>
                </div>
            </div>

            {/* Empty State */}
            {requests.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center">
                    <h2 className="text-lg font-semibold text-foreground">
                        No rental requests
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        You don't have any rental requests yet.
                    </p>
                </div>
            ) : (
                /* Request List */
                <div className="space-y-4">
                    {requests.map((request) => (
                        <article
                            key={request.id}
                            className="group overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-shadow duration-300 hover:shadow-md"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Property Image */}
                                <div className="w-full shrink-0 p-3 md:w-72">
                                    <div className="relative h-56 w-full overflow-hidden rounded-xl bg-muted">
                                        <Image
                                            unoptimized
                                            src={
                                                request.property?.propertyPhoto ||
                                                "/placeholder-property.jpg"
                                            }
                                            alt={request.property?.title || "Property"}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 288px"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                </div>

                                {/* Request Details */}
                                <div className="flex flex-1 flex-col justify-between p-6 md:pl-0">
                                    <div>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                    Property
                                                </p>

                                                <h2 className="mt-1 truncate text-xl font-bold text-card-foreground">
                                                    {request.property?.title ||
                                                        "Unknown property"}
                                                </h2>
                                            </div>

                                            <StatusBadge status={request.status} />
                                        </div>

                                        <p className="mt-3 text-sm text-muted-foreground">
                                            {request.property?.city || "Unknown city"}
                                            {request.property?.country
                                                ? `, ${request.property.country}`
                                                : ""}
                                        </p>

                                        {/* Tenant */}
                                        <div className="mt-5">
                                            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                Tenant
                                            </p>

                                            <p className="mt-1 font-medium text-foreground">
                                                {request.tenant?.name || "Unknown tenant"}
                                            </p>

                                            <p className="break-all text-sm text-muted-foreground">
                                                {request.tenant?.email || "No email available"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Details Link */}
                                    <div className="mt-6 flex justify-end">
                                        <Link
                                            href={`/dashboard/landlord/requests/${request.id}`}
                                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            View Details
                                            <ArrowRight
                                                size={16}
                                                className="transition-transform duration-200 group-hover:translate-x-1"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: RequestStatus }) {
    const styles: Record<RequestStatus, string> = {
        PENDING:
            "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
        APPROVED:
            "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        REJECTED:
            "border-destructive/30 bg-destructive/10 text-destructive",
        CANCELLED:
            "border-border bg-muted text-muted-foreground",
        ACTIVE:
            "border-primary/30 bg-primary/10 text-primary",
        COMPLETED:
            "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-400",
    };

    return (
        <span
            className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
        >
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
            {formatStatus(status)}
        </span>
    );
}

function formatStatus(status: RequestStatus) {
    return status.charAt(0) + status.slice(1).toLowerCase();
}
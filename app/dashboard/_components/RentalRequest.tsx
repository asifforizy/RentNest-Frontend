
"use client";

import { Rental } from "@/types/rental";
import Image from "next/image";
import Link from "next/link";

interface Props {
    rentals: Rental[];
}

export default function RentalRequests({ rentals }: Props) {
    return (
        <section className="mt-8">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                    My Rental Requests
                </h2>

                <p className="text-sm text-muted-foreground">
                    Track your rental requests and their current status.
                </p>
            </div>

            {/* Empty State */}
            {rentals.length === 0 ? (
                <div className="rounded-xl border border-border bg-card p-6 text-center">
                    <p className="text-muted-foreground">
                        You don't have any rental requests yet.
                    </p>
                </div>
            ) : (
                /* Rental Cards */
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {rentals.map((rental) => (
                        <article
                            key={rental.id}
                            className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md"
                        >
                            {/* Property Image */}
                            <div className="relative h-48 bg-muted">
                                <Image
                                    unoptimized
                                    src={
                                        rental.property?.propertyPhoto ||
                                        "/placeholder-property.jpg"
                                    }
                                    alt={rental.property?.title || "Property"}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>

                            {/* Property Information */}
                            <div className="p-5">
                                <h3 className="truncate text-lg font-semibold text-card-foreground">
                                    {rental.property?.title || "Unknown Property"}
                                </h3>

                                {rental.property?.rentPrice !== undefined && (
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        ৳ {Number(rental.property.rentPrice).toLocaleString()}{" "}
                                        / month
                                    </p>
                                )}

                                {/* Status */}
                                <div className="mt-4 flex items-center justify-between gap-3">
                                    <span className="text-sm text-muted-foreground">
                                        Status
                                    </span>

                                    <RentalStatusBadge status={rental.status} />
                                </div>

                                {/* Requested Date */}
                                <p className="mt-3 text-xs text-muted-foreground">
                                    Requested{" "}
                                    {new Date(rental.createdAt).toLocaleDateString()}
                                </p>

                                {/* Pay Now */}
                                {rental.status === "APPROVED" && (
                                    <div className="mt-5">
                                        <Link
                                            href={`/dashboard/tenant/requests/${rental.id}/pay`}
                                            className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                                        >
                                            Pay Now
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

function RentalStatusBadge({ status }: { status: Rental["status"] }) {
    const styles: Record<string, string> = {
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
            className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-medium ${styles[String(status)] ??
                "border-border bg-muted text-muted-foreground"
                }`}
        >
            {String(status).charAt(0) +
                String(status).slice(1).toLowerCase()}
        </span>
    );
}
